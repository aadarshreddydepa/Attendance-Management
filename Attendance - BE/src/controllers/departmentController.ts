import { Request, Response } from 'express';
import Department from '../models/Department';

// Get all departments
export const getAllDepartments = async (req: Request, res: Response) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get departments', error });
  }
};

// Create department
export const createDepartment = async (req: Request, res: Response) => {
  try {
    const newDept = new Department(req.body);
    await newDept.save();
    res.status(201).json(newDept);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create department', error });
  }
};

// Update department
export const updateDepartment = async (req: Request, res: Response) => {
  try {
    const updatedDept = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedDept) return res.status(404).json({ message: 'Department not found' });
    res.json(updatedDept);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update department', error });
  }
};

// Delete department
export const deleteDepartment = async (req: Request, res: Response) => {
  try {
    const deleted = await Department.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Department not found' });
    res.json({ message: 'Department deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete department', error });
  }
};
