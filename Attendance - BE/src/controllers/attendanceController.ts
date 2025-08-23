import { Request, Response } from 'express';
import Attendance from '../models/Attendance';
import Student from '../models/Student';

// Mark attendance for single student
export const markAttendance = async (req: any, res: Response) => {
  try {
    const { studentId, date, period, status, department, section, notes } = req.body;
    const markedBy = req.user._id;

    // Check if attendance already exists
    const existingAttendance = await Attendance.findOne({
      studentId,
      date: new Date(date),
      period
    });

    if (existingAttendance) {
      // Update existing attendance
      existingAttendance.status = status;
      existingAttendance.markedBy = markedBy;
      existingAttendance.notes = notes || '';
      existingAttendance.timestamp = new Date();
      
      await existingAttendance.save();
      
      return res.json({
        message: 'Attendance updated successfully',
        attendance: existingAttendance
      });
    }

    // Create new attendance record
    const attendance = new Attendance({
      studentId,
      date: new Date(date),
      period,
      status,
      markedBy,
      department,
      section,
      notes: notes || '',
      method: 'manual'
    });

    await attendance.save();
    
    res.status(201).json({
      message: 'Attendance marked successfully',
      attendance
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to mark attendance', error });
  }
};

// Mark bulk attendance (for entire class)
export const markBulkAttendance = async (req: any, res: Response) => {
  try {
    const { attendanceRecords, date, period, department, section } = req.body;
    const markedBy = req.user._id;

    const results = [];
    
    for (const record of attendanceRecords) {
      const filter = {
        studentId: record.studentId,
        date: new Date(date),
        period
      };
      
      const update = {
        studentId: record.studentId,
        date: new Date(date),
        period,
        status: record.status,
        markedBy,
        department,
        section,
        method: 'manual',
        timestamp: new Date(),
        notes: record.notes || ''
      };

      // Upsert (update if exists, create if not)
      const attendance = await Attendance.findOneAndUpdate(
        filter,
        update,
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      
      results.push(attendance);
    }

    res.json({
      message: `Bulk attendance marked for ${results.length} students`,
      results
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to mark bulk attendance', error });
  }
};

// Get attendance records with filtering
export const getAttendance = async (req: Request, res: Response) => {
  try {
    const {
      date,
      department,
      section,
      period,
      status,
      startDate,
      endDate,
      page = 1,
      limit = 50
    } = req.query;

    const filter: any = {};
    
    if (date) filter.date = new Date(date as string);
    if (department) filter.department = department;
    if (section) filter.section = section;
    if (period) filter.period = period;
    if (status) filter.status = status;
    
    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate as string),
        $lte: new Date(endDate as string)
      };
    }

    const skip = (Number(page) - 1) * Number(limit);
    
    const attendance = await Attendance.find(filter)
      .populate('studentId', 'name studentId email')
      .populate('markedBy', 'name email')
      .sort({ date: -1, period: 1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Attendance.countDocuments(filter);

    res.json({
      attendance,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        totalRecords: total
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get attendance', error });
  }
};

// Get attendance for specific date
export const getAttendanceByDate = async (req: Request, res: Response) => {
  try {
    const { date } = req.params;
    const { department, section, period } = req.query;
    
    const filter: any = {
      date: new Date(date)
    };
    
    if (department) filter.department = department;
    if (section) filter.section = section;
    if (period) filter.period = period;
    
    const attendance = await Attendance.find(filter)
      .populate('studentId', 'name studentId email photo')
      .sort({ period: 1 });
    
    // Group by period for easier frontend consumption
    const groupedByPeriod = attendance.reduce((acc: any, record: any) => {
      if (!acc[record.period]) {
        acc[record.period] = [];
      }
      acc[record.period].push(record);
      return acc;
    }, {});
    
    res.json({
      date,
      attendanceByPeriod: groupedByPeriod,
      totalRecords: attendance.length
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get attendance by date', error });
  }
};

// Get attendance for specific student
export const getStudentAttendance = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const { startDate, endDate, period } = req.query;
    
    const filter: any = { studentId };
    
    if (period) filter.period = period;
    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate as string),
        $lte: new Date(endDate as string)
      };
    }
    
    const attendance = await Attendance.find(filter)
      .populate('markedBy', 'name')
      .sort({ date: -1, period: 1 });
    
    // Calculate statistics
    const stats = {
      totalDays: attendance.length,
      present: attendance.filter(a => a.status === 'present').length,
      absent: attendance.filter(a => a.status === 'absent').length,
      late: attendance.filter(a => a.status === 'late').length,
      presentPercentage:0
    };
    
    stats.presentPercentage = stats.totalDays > 0 
      ? Math.round((stats.present / stats.totalDays) * 100) 
      : 0;
    
    res.json({
      studentId,
      attendance,
      statistics: stats
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get student attendance', error });
  }
};

// Get attendance statistics
export const getAttendanceStats = async (req: Request, res: Response) => {
  try {
    const { date, department, section } = req.query;
    
    const filter: any = {};
    if (date) filter.date = new Date(date as string);
    if (department) filter.department = department;
    if (section) filter.section = section;
    
    const stats = await Attendance.aggregate([
      { $match: filter },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    
    const result = {
      present: 0,
      absent: 0,
      late: 0,
      total: 0,
      presentPercentage:0
    };
    
    stats.forEach(stat => {
      result[stat._id as keyof typeof result] = stat.count;
      result.total += stat.count;
    });
    
    result.presentPercentage = result.total > 0 
      ? Math.round((result.present / result.total) * 100) 
      : 0;
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get attendance stats', error });
  }
};
