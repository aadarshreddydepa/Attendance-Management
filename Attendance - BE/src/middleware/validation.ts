import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// Validate registration inputs (email, password, name)
export const validateRegister = [
  body('email').isEmail().withMessage('Must be a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Must be at least 6 characters'),
  body('name').notEmpty().withMessage('Name is required'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }
];

// Validate login inputs (email, password)
export const validateLogin = [
  body('email').isEmail().withMessage('Must be a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }
];

// Example: you can add more validation arrays for students, attendance, etc.

