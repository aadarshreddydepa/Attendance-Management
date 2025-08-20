import { Request, Response } from 'express';
import { PipelineStage } from 'mongoose';
import Attendance from '../models/Attendance';

interface AttendanceSummary {
  date: Date;
  present: number;
  absent: number;
  percentage: number;
}

export const attendanceSummary = async (req: Request, res: Response) => {
  try {
    const pipeline: PipelineStage[] = [
      {
        $group: {
          _id: '$date',
          present: { $sum: { $cond: [{ $eq: ['$status', 'present'] }, 1, 0] } },
          absent: { $sum: { $cond: [{ $eq: ['$status', 'absent'] }, 1, 0] } },
          total: { $sum: 1 }
        }
      },
      {
        $project: {
          date: '$_id',
          present: 1,
          absent: 1,
          percentage: { $multiply: [{ $divide: ['$present', '$total'] }, 100] }
        }
      },
      {
        $sort: { date: 1 }
      }
    ];

    const result = await Attendance.aggregate<AttendanceSummary>(pipeline);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate report', error });
  }
};
