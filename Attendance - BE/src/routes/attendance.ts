import express from 'express';
import { authenticateToken, requireRole } from '../middleware/auth';
import {
  markAttendance,
  getAttendance,
  getAttendanceByDate,
  getStudentAttendance,
  markBulkAttendance,
  getAttendanceStats
} from '../controllers/attendanceController';

const router = express.Router();

// Mark attendance for single student
router.post('/mark', authenticateToken, requireRole(['admin', 'teacher']), markAttendance);

// Mark bulk attendance (multiple students at once)
router.post('/bulk', authenticateToken, requireRole(['admin', 'teacher']), markBulkAttendance);

// Get attendance records with filters
router.get('/', authenticateToken, getAttendance);

// Get attendance for specific date
router.get('/date/:date', authenticateToken, getAttendanceByDate);

// Get attendance for specific student
router.get('/student/:studentId', authenticateToken, getStudentAttendance);

// Get attendance statistics
router.get('/stats', authenticateToken, getAttendanceStats);

export default router;
