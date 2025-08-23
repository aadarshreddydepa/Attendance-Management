import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import authRoutes from './src/routes/auth';
import studentRoutes from './src/routes/students';
import attendanceRoutes from './src/routes/attendance';
import departmentRoutes from './src/routes/departments';
import reportRoutes from './src/routes/reports';

// Load environment variables from .env file
dotenv.config();

// Create Express application instance
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware Setup
app.use(helmet()); // Security headers
app.use(cors()); // Allow cross-origin requests from frontend
app.use(express.json({ limit: '10mb' })); // Parse JSON bodies (with size limit)
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/attendance_management')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((error) => console.error('❌ MongoDB connection error:', error));

// Routes Registration
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/reports', reportRoutes);

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Server is running!', 
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

// Global Error Handling Middleware
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('❌ Error:', error);
  res.status(500).json({ 
    message: 'Internal server error', 
    error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔒 Environment: ${process.env.NODE_ENV || 'development'}`);
});
