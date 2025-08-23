import { Request, Response } from 'express';
import { PipelineStage } from 'mongoose';
import Attendance from '../models/Attendance';
import Student from '../models/Student';
import Department from '../models/Department';

// Dashboard statistics
export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Total students
    const totalStudents = await Student.countDocuments({ isActive: true });
    
    // Today's attendance
    const todayAttendance = await Attendance.aggregate([
      { $match: { date: today } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    
    const todayStats = {
      present: 0,
      absent: 0,
      late: 0,
      total: 0,
      percentage: 0
    };
    
    todayAttendance.forEach(stat => {
      todayStats[stat._id as keyof typeof todayStats] = stat.count;
      todayStats.total += stat.count;
    });
    
    todayStats.percentage = todayStats.total > 0 
      ? Math.round((todayStats.present / todayStats.total) * 100) 
      : 0;
    
    // Department count
    const totalDepartments = await Department.countDocuments({ isActive: true });
    
    // Recent activity (last 5 attendance records)
    const recentActivity = await Attendance.find()
      .populate('studentId', 'name studentId')
      .populate('markedBy', 'name')
      .sort({ timestamp: -1 })
      .limit(5);
    
    res.json({
      totalStudents,
      todayAttendance: todayStats,
      totalDepartments,
      recentActivity
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get dashboard stats', error });
  }
};

// Attendance summary with date range
export const getAttendanceSummary = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate, department, section } = req.query;
    
    const matchFilter: any = {};
    
    if (startDate && endDate) {
      matchFilter.date = {
        $gte: new Date(startDate as string),
        $lte: new Date(endDate as string)
      };
    }
    
    if (department) matchFilter.department = department;
    if (section) matchFilter.section = section;
    
    const pipeline: PipelineStage[] = [
      { $match: matchFilter },
      {
        $group: {
          _id: {
            date: '$date',
            department: '$department'
          },
          present: { $sum: { $cond: [{ $eq: ['$status', 'present'] }, 1, 0] } },
          absent: { $sum: { $cond: [{ $eq: ['$status', 'absent'] }, 1, 0] } },
          late: { $sum: { $cond: [{ $eq: ['$status', 'late'] }, 1, 0] } },
          total: { $sum: 1 }
        }
      },
      {
        $project: {
          date: '$_id.date',
          department: '$_id.department',
          present: 1,
          absent: 1,
          late: 1,
          total: 1,
          percentage: { 
            $round: [{ $multiply: [{ $divide: ['$present', '$total'] }, 100] }, 2] 
          }
        }
      },
      { $sort: { date: -1 } }
    ];
    
    const summary = await Attendance.aggregate(pipeline);
    res.json(summary);
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate attendance summary', error });
  }
};

// Department-wise attendance report
export const getDepartmentWiseReport = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;
    
    const matchFilter: any = {};
    if (startDate && endDate) {
      matchFilter.date = {
        $gte: new Date(startDate as string),
        $lte: new Date(endDate as string)
      };
    }
    
    const pipeline: PipelineStage[] = [
      { $match: matchFilter },
      {
        $group: {
          _id: '$department',
          present: { $sum: { $cond: [{ $eq: ['$status', 'present'] }, 1, 0] } },
          absent: { $sum: { $cond: [{ $eq: ['$status', 'absent'] }, 1, 0] } },
          late: { $sum: { $cond: [{ $eq: ['$status', 'late'] }, 1, 0] } },
          total: { $sum: 1 }
        }
      },
      {
        $project: {
          department: '$_id',
          present: 1,
          absent: 1,
          late: 1,
          total: 1,
          attendanceRate: { 
            $round: [{ $multiply: [{ $divide: ['$present', '$total'] }, 100] }, 2] 
          }
        }
      },
      { $sort: { attendanceRate: -1 } }
    ];
    
    const departmentReport = await Attendance.aggregate(pipeline);
    
    // Get student counts for each department
    const departmentStudents = await Student.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$department',
          studentCount: { $sum: 1 }
        }
      }
    ]);
    
    // Combine data
    const combinedReport = departmentReport.map(dept => {
      const studentInfo = departmentStudents.find(s => s._id === dept.department);
      return {
        ...dept,
        totalStudents: studentInfo ? studentInfo.studentCount : 0
      };
    });
    
    res.json(combinedReport);
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate department report', error });
  }
};

// Section-wise attendance report
export const getSectionWiseReport = async (req: Request, res: Response) => {
  try {
    const { department, startDate, endDate } = req.query;
    
    const matchFilter: any = {};
    if (department) matchFilter.department = department;
    if (startDate && endDate) {
      matchFilter.date = {
        $gte: new Date(startDate as string),
        $lte: new Date(endDate as string)
      };
    }
    
    const pipeline: PipelineStage[] = [
      { $match: matchFilter },
      {
        $group: {
          _id: {
            department: '$department',
            section: '$section'
          },
          present: { $sum: { $cond: [{ $eq: ['$status', 'present'] }, 1, 0] } },
          absent: { $sum: { $cond: [{ $eq: ['$status', 'absent'] }, 1, 0] } },
          late: { $sum: { $cond: [{ $eq: ['$status', 'late'] }, 1, 0] } },
          total: { $sum: 1 }
        }
      },
      {
        $project: {
          department: '$_id.department',
          section: '$_id.section',
          present: 1,
          absent: 1,
          late: 1,
          total: 1,
          attendanceRate: { 
            $round: [{ $multiply: [{ $divide: ['$present', '$total'] }, 100] }, 2] 
          }
        }
      },
      { $sort: { department: 1, section: 1 } }
    ];
    
    const sectionReport = await Attendance.aggregate(pipeline);
    res.json(sectionReport);
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate section report', error });
  }
};

// Student-wise attendance report
export const getStudentWiseReport = async (req: Request, res: Response) => {
  try {
    const { department, section, startDate, endDate, page = 1, limit = 20 } = req.query;
    
    const matchFilter: any = {};
    if (department) matchFilter.department = department;
    if (section) matchFilter.section = section;
    if (startDate && endDate) {
      matchFilter.date = {
        $gte: new Date(startDate as string),
        $lte: new Date(endDate as string)
      };
    }
    
    const pipeline: PipelineStage[] = [
      { $match: matchFilter },
      {
        $group: {
          _id: '$studentId',
          present: { $sum: { $cond: [{ $eq: ['$status', 'present'] }, 1, 0] } },
          absent: { $sum: { $cond: [{ $eq: ['$status', 'absent'] }, 1, 0] } },
          late: { $sum: { $cond: [{ $eq: ['$status', 'late'] }, 1, 0] } },
          total: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'students',
          localField: '_id',
          foreignField: 'studentId',
          as: 'student'
        }
      },
      {
        $project: {
          studentId: '$_id',
          student: { $arrayElemAt: ['$student', 0] },
          present: 1,
          absent: 1,
          late: 1,
          total: 1,
          attendanceRate: { 
            $round: [{ $multiply: [{ $divide: ['$present', '$total'] }, 100] }, 2] 
          }
        }
      },
      { $sort: { attendanceRate: -1 } },
      { $skip: (Number(page) - 1) * Number(limit) },
      { $limit: Number(limit) }
    ];
    
    const studentReport = await Attendance.aggregate(pipeline);
    res.json(studentReport);
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate student report', error });
  }
};

// Monthly attendance trends
export const getMonthlyTrends = async (req: Request, res: Response) => {
  try {
    const { year = new Date().getFullYear(), department } = req.query;
    
    const matchFilter: any = {
      date: {
        $gte: new Date(`${year}-01-01`),
        $lte: new Date(`${year}-12-31`)
      }
    };
    
    if (department) matchFilter.department = department;
    
    const pipeline: PipelineStage[] = [
      { $match: matchFilter },
      {
        $group: {
          _id: {
            month: { $month: '$date' },
            year: { $year: '$date' }
          },
          present: { $sum: { $cond: [{ $eq: ['$status', 'present'] }, 1, 0] } },
          absent: { $sum: { $cond: [{ $eq: ['$status', 'absent'] }, 1, 0] } },
          late: { $sum: { $cond: [{ $eq: ['$status', 'late'] }, 1, 0] } },
          total: { $sum: 1 }
        }
      },
      {
        $project: {
          month: '$_id.month',
          year: '$_id.year',
          present: 1,
          absent: 1,
          late: 1,
          total: 1,
          attendanceRate: { 
            $round: [{ $multiply: [{ $divide: ['$present', '$total'] }, 100] }, 2] 
          }
        }
      },
      { $sort: { month: 1 } }
    ];
    
    const monthlyTrends = await Attendance.aggregate(pipeline);
    res.json(monthlyTrends);
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate monthly trends', error });
  }
};

// General attendance report with flexible filters
export const getAttendanceReport = async (req: Request, res: Response) => {
  try {
    const {
      startDate,
      endDate,
      department,
      section,
      period,
      status,
      groupBy = 'date'
    } = req.query;
    
    const matchFilter: any = {};
    
    if (startDate && endDate) {
      matchFilter.date = {
        $gte: new Date(startDate as string),
        $lte: new Date(endDate as string)
      };
    }
    
    if (department) matchFilter.department = department;
    if (section) matchFilter.section = section;
    if (period) matchFilter.period = period;
    if (status) matchFilter.status = status;
    
    let groupId: any = {};
    
    switch (groupBy) {
      case 'department':
        groupId = '$department';
        break;
      case 'section':
        groupId = { department: '$department', section: '$section' };
        break;
      case 'period':
        groupId = '$period';
        break;
      default:
        groupId = '$date';
    }
    
    const pipeline: PipelineStage[] = [
      { $match: matchFilter },
      {
        $group: {
          _id: groupId,
          present: { $sum: { $cond: [{ $eq: ['$status', 'present'] }, 1, 0] } },
          absent: { $sum: { $cond: [{ $eq: ['$status', 'absent'] }, 1, 0] } },
          late: { $sum: { $cond: [{ $eq: ['$status', 'late'] }, 1, 0] } },
          total: { $sum: 1 }
        }
      },
      {
        $project: {
          groupBy: '$_id',
          present: 1,
          absent: 1,
          late: 1,
          total: 1,
          attendanceRate: { 
            $round: [{ $multiply: [{ $divide: ['$present', '$total'] }, 100] }, 2] 
          }
        }
      },
      { $sort: { '_id': 1 } }
    ];
    
    const report = await Attendance.aggregate(pipeline);
    res.json(report);
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate report', error });
  }
};

// Export attendance data as CSV
export const exportAttendanceCSV = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate, department, section } = req.query;
    
    const matchFilter: any = {};
    if (startDate && endDate) {
      matchFilter.date = {
        $gte: new Date(startDate as string),
        $lte: new Date(endDate as string)
      };
    }
    if (department) matchFilter.department = department;
    if (section) matchFilter.section = section;
    
    const attendance = await Attendance.find(matchFilter)
      .populate('studentId', 'name studentId email')
      .populate('markedBy', 'name')
      .sort({ date: -1, period: 1 });
    
    // Convert to CSV format
    const csvHeader = 'Date,Student ID,Student Name,Department,Section,Period,Status,Marked By,Timestamp\n';
    
    const csvData = attendance.map(record => {
      const student = record.studentId as any;
      const markedBy = record.markedBy as any;
      
      return [
        record.date.toISOString().split('T')[0],
        student?.studentId || 'N/A',
        student?.name || 'N/A',
        record.department,
        record.section,
        record.period,
        record.status,
        markedBy?.name || 'System',
        record.timestamp.toISOString()
      ].join(',');
    }).join('\n');
    
    const csv = csvHeader + csvData;
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=attendance-report.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: 'Failed to export CSV', error });
  }
};
