import mongoose, { Document, Schema } from 'mongoose';

export interface IAttendance extends Document {
  studentId: string;
  date: Date;
  period: string;
  status: 'present' | 'absent' | 'late';
  markedBy: string;
  method: 'manual' | 'facial-recognition';
  department: string;
  section: string;
  timestamp: Date;
  notes?: string;
}

const attendanceSchema = new Schema<IAttendance>({
  studentId: {
    type: String,
    required: true,
    ref: 'Student'
  },
  date: {
    type: Date,
    required: true
  },
  period: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['present', 'absent', 'late'],
    required: true
  },
  markedBy: {
    type: String,
    required: true,
    ref: 'User'
  },
  method: {
    type: String,
    enum: ['manual', 'facial-recognition'],
    default: 'manual'
  },
  department: {
    type: String,
    required: true
  },
  section: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: String,
    default: ''
  }
});

// Compound index to prevent duplicate attendance records
attendanceSchema.index({ studentId: 1, date: 1, period: 1 }, { unique: true });

export default mongoose.model<IAttendance>('Attendance', attendanceSchema);
