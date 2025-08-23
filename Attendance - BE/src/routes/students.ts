import express from 'express';
import { authenticateToken, requireRole } from '../middleware/auth';
import { 
  getAllStudents, 
  getStudentById, 
  createStudent, 
  updateStudent, 
  deleteStudent,
  uploadStudentPhoto,
  getStudentsByDepartment 
} from '../controllers/studentController';
import upload from '../middleware/upload';

const router = express.Router();

// Get all students (with optional filters)
router.get('/', authenticateToken, getAllStudents);

// Get students by department and section
router.get('/department/:dept/section/:section', authenticateToken, getStudentsByDepartment);

// Get single student by ID
router.get('/:id', authenticateToken, getStudentById);

// Create new student (admin/teacher only)
router.post('/', authenticateToken, requireRole(['admin', 'teacher']), createStudent);

// Update student (admin/teacher only)
router.put('/:id', authenticateToken, requireRole(['admin', 'teacher']), updateStudent);

// Upload student photo
router.post('/:id/photo', authenticateToken, upload.single('photo'), uploadStudentPhoto);

// Delete student (admin only)
router.delete('/:id', authenticateToken, requireRole(['admin']), deleteStudent);

export default router;
