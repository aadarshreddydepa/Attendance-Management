import { Request, Response } from 'express';
import Department from '../models/Department';
import Student from '../models/Student';
import Attendance from '../models/Attendance';

// Get all departments with student counts
export const getAllDepartments = async (req: Request, res: Response) => {
  try {
    const { search, isActive = true } = req.query;
    
    const filter: any = {};
    if (isActive !== 'all') filter.isActive = isActive === 'true';
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { code: { $regex: search, $options: 'i' } },
        { hod: { $regex: search, $options: 'i' } }
      ];
    }
    
    const departments = await Department.find(filter).sort({ name: 1 });
    
    // Get student counts for each department
    const departmentsWithCounts = await Promise.all(
      departments.map(async (dept) => {
        const studentCount = await Student.countDocuments({ 
          department: dept.name, 
          isActive: true 
        });
        
        const facultyCount = await Student.countDocuments({ 
          department: dept.name, 
          isActive: true 
        }); // You might want to create a Faculty model later
        
        return {
          ...dept.toObject(),
          actualStudents: studentCount,
          actualFaculty: facultyCount || dept.sections * 2 // Mock faculty count
        };
      })
    );
    
    res.json(departmentsWithCounts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get departments', error });
  }
};

// Get single department with detailed info
export const getDepartmentById = async (req: Request, res: Response) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }
    
    // Get additional statistics
    const studentCount = await Student.countDocuments({ 
      department: department.name, 
      isActive: true 
    });
    
    const sectionStats = await Student.aggregate([
      { 
        $match: { 
          department: department.name, 
          isActive: true 
        } 
      },
      {
        $group: {
          _id: '$section',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);
    
    const yearStats = await Student.aggregate([
      { 
        $match: { 
          department: department.name, 
          isActive: true 
        } 
      },
      {
        $group: {
          _id: '$year',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);
    
    res.json({
      department,
      statistics: {
        totalStudents: studentCount,
        sectionWiseCount: sectionStats,
        yearWiseCount: yearStats
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get department', error });
  }
};

// Create new department
export const createDepartment = async (req: Request, res: Response) => {
  try {
    const { name, code, hod, sections, established } = req.body;
    
    // Check if department name already exists
    const existingName = await Department.findOne({ name });
    if (existingName) {
      return res.status(400).json({ message: 'Department name already exists' });
    }
    
    // Check if department code already exists
    const existingCode = await Department.findOne({ code: code.toUpperCase() });
    if (existingCode) {
      return res.status(400).json({ message: 'Department code already exists' });
    }
    
    const department = new Department({
      name,
      code: code.toUpperCase(),
      hod,
      sections,
      established
    });
    
    await department.save();
    
    res.status(201).json({
      message: 'Department created successfully',
      department
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create department', error });
  }
};

// Update department
export const updateDepartment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // If updating code, make it uppercase
    if (updateData.code) {
      updateData.code = updateData.code.toUpperCase();
    }
    
    const updatedDepartment = await Department.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!updatedDepartment) {
      return res.status(404).json({ message: 'Department not found' });
    }
    
    res.json({
      message: 'Department updated successfully',
      department: updatedDepartment
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update department', error });
  }
};

// Soft delete department
export const deleteDepartment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Check if department has active students
    const department = await Department.findById(id);
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }
    
    const activeStudents = await Student.countDocuments({ 
      department: department.name, 
      isActive: true 
    });
    
    if (activeStudents > 0) {
      return res.status(400).json({ 
        message: `Cannot delete department. It has ${activeStudents} active students.`,
        activeStudents
      });
    }
    
    // Soft delete
    department.isActive = false;
    await department.save();
    
    res.json({ message: 'Department deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete department', error });
  }
};

// Get department statistics and analytics
export const getDepartmentStats = async (req: Request, res: Response) => {
  try {
    const stats = await Department.aggregate([
      {
        $lookup: {
          from: 'students',
          localField: 'name',
          foreignField: 'department',
          as: 'students'
        }
      },
      {
        $project: {
          name: 1,
          code: 1,
          sections: 1,
          established: 1,
          studentCount: {
            $size: {
              $filter: {
                input: '$students',
                cond: { $eq: ['$$this.isActive', true] }
              }
            }
          },
          avgStudentsPerSection: {
            $divide: [
              {
                $size: {
                  $filter: {
                    input: '$students',
                    cond: { $eq: ['$$this.isActive', true] }
                  }
                }
              },
              '$sections'
            ]
          }
        }
      },
      {
        $sort: { studentCount: -1 }
      }
    ]);
    
    const totalDepartments = await Department.countDocuments({ isActive: true });
    const totalStudents = await Student.countDocuments({ isActive: true });
    
    res.json({
      summary: {
        totalDepartments,
        totalStudents,
        avgStudentsPerDepartment: Math.round(totalStudents / totalDepartments)
      },
      departments: stats
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get department stats', error });
  }
};

// Get students in a department
export const getDepartmentStudents = async (req: Request, res: Response) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }
    
    const { section, year, page = 1, limit = 20 } = req.query;
    
    const filter: any = { 
      department: department.name, 
      isActive: true 
    };
    
    if (section) filter.section = section;
    if (year) filter.year = year;
    
    const skip = (Number(page) - 1) * Number(limit);
    
    const students = await Student.find(filter)
      .sort({ section: 1, name: 1 })
      .skip(skip)
      .limit(Number(limit));
    
    const total = await Student.countDocuments(filter);
    
    res.json({
      department: department.name,
      students,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        totalStudents: total
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get department students', error });
  }
};
