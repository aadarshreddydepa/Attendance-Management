import { Request, Response } from 'express';
import Attendance from '../models/Attendance';

// Mark attendance (single or bulk)
export const markAttendance = async (req: Request, res: Response) => {
  try {
    let attendanceRecords = req.body; // Expect array or single record
    if (!Array.isArray(attendanceRecords)) attendanceRecords = [attendanceRecords];

    const results = [];
    for (const record of attendanceRecords) {
      const filter = { studentId: record.studentId, date: record.date, period: record.period };
      const update = { ...record, timestamp: new Date() };
      const options = { upsert: true, new: true, setDefaultsOnInsert: true };

      const updated = await Attendance.findOneAndUpdate(filter, update, options);
      results.push(updated);
    }

    res.json({ message: 'Attendance marked', results });
  } catch (error) {
    res.status(500).json({ message: 'Failed to mark attendance', error });
  }
};

// Get attendance by date, department, section, period, or student
export const getAttendance = async (req: Request, res: Response) => {
  try {
    const filters = req.query;
    const attendance = await Attendance.find(filters).sort({ date: -1, period: 1 });
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get attendance', error });
  }
};
