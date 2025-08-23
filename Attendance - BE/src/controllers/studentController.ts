import { Request, Response } from 'express';
import Student from '../models/Student';

// Get all students with filtering and pagination
export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const { 
      department, 
      section, 
      year, 
      search, 
      page = 1, 
      limit = 10,
      sortBy = 'name',
      sortOrder = 'asc'
    } = req.query;

    // Build filter object
    const filter: any = { isActive: true };
    
    if (department) filter.department = department;
    if (section) filter.section = section;
    if (year) filter.year = year;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { studentId: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    // Calculate pagination
    const skip = (Number(page) - 1) * Number(limit);
    
    // Build sort object
    const sort: any = {};
    sort[sortBy as string] = sortOrder === 'desc' ? -1 : 1;

    // Execute query
    const students = await Student.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    const total = await Student.countDocuments(filter);

    res.json({
      students,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        totalStudents: total,
        studentsPerPage: Number(limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get students', error });
  }
};

// Get students by department and section
export const getStudentsByDepartment = async (req: Request, res: Response) => {
  try {
    const { dept, section } = req.params;
    const students = await Student.find({ 
      department: dept, 
      section: section, 
      isActive: true 
    }).sort({ name: 1 });
    
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get students', error });
  }
};

// Get single student
export const getStudentById = async (req: Request, res: Response) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get student', error });
  }
};

// Create new student
export const createStudent = async (req: Request, res: Response) => {
  try {
    const studentData = req.body;
    
    // Check if student ID already exists
    const existingStudent = await Student.findOne({ studentId: studentData.studentId });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student ID already exists' });
    }

    // Check if email already exists
    const existingEmail = await Student.findOne({ email: studentData.email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const newStudent = new Student(studentData);
    await newStudent.save();
    
    res.status(201).json({
      message: 'Student created successfully',
      student: newStudent
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create student', error });
  }
};

// Update student
export const updateStudent = async (req: Request, res: Response) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    
    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    res.json({
      message: 'Student updated successfully',
      student: updatedStudent
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update student', error });
  }
};

// Upload student photo
export const uploadStudentPhoto = async (req: any, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No photo uploaded' });
    }

    // Here you would typically upload to cloud storage (Cloudinary, AWS S3, etc.)
    // For now, we'll just save the filename
    const photoUrl = `/uploads/students/${req.file.filename}`;

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { photo: photoUrl },
      { new: true }
    );

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({
      message: 'Photo uploaded successfully',
      student,
      photoUrl
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to upload photo', error });
  }
};

// Soft delete student (set isActive to false)
export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete student', error });
  }
};
