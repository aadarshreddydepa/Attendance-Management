import express from 'express';
import { authenticateToken, requireRole } from '../middleware/auth';
import {
  getAttendanceSummary,
  getDepartmentWiseReport,
  getSectionWiseReport,
  getStudentWiseReport,
  getMonthlyTrends,
  getAttendanceReport,
  exportAttendanceCSV,
  getDashboardStats
} from '../controllers/reportController';

const router = express.Router();

// Dashboard statistics
router.get('/dashboard', authenticateToken, getDashboardStats);

// Attendance summary report
router.get('/attendance-summary', authenticateToken, getAttendanceSummary);

// Department-wise attendance report
router.get('/department-wise', authenticateToken, getDepartmentWiseReport);

// Section-wise attendance report
router.get('/section-wise', authenticateToken, getSectionWiseReport);

// Student-wise attendance report
router.get('/student-wise', authenticateToken, getStudentWiseReport);

// Monthly attendance trends
router.get('/monthly-trends', authenticateToken, getMonthlyTrends);

// General attendance report with filters
router.get('/attendance', authenticateToken, getAttendanceReport);

// Export attendance data as CSV
router.get('/export/csv', authenticateToken, requireRole(['admin', 'teacher']), exportAttendanceCSV);

export default router;
