import express from 'express';
import { authenticateToken, requireRole } from '../middleware/auth';
import {
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  getDepartmentStats,
  getDepartmentStudents
} from '../controllers/departmentController';

const router = express.Router();

// Get all departments
router.get('/', authenticateToken, getAllDepartments);

// Get department statistics
router.get('/stats', authenticateToken, getDepartmentStats);

// Get single department by ID
router.get('/:id', authenticateToken, getDepartmentById);

// Get students in a department
router.get('/:id/students', authenticateToken, getDepartmentStudents);

// Create new department (admin only)
router.post('/', authenticateToken, requireRole(['admin']), createDepartment);

// Update department (admin only)
router.put('/:id', authenticateToken, requireRole(['admin']), updateDepartment);

// Delete department (admin only)
router.delete('/:id', authenticateToken, requireRole(['admin']), deleteDepartment);

export default router;
