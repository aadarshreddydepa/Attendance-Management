import React, { useState, useEffect } from 'react';
import { Users, GraduationCap, Calendar, BarChart3, Camera, UserCheck, Building2, BookOpen } from 'lucide-react';
import Dashboard from './components/Dashboard';
import StudentManagement from './components/StudentManagement';
import AttendanceTracking from './components/AttendanceTracking';
import FacialRecognition from './components/FacialRecognition';
import Reports from './components/Reports';
import DepartmentManagement from './components/DepartmentManagement';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState({ role: 'admin', name: 'Admin User' });

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'departments', label: 'Departments', icon: Building2 },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'attendance', label: 'Take Attendance', icon: UserCheck },
    { id: 'facial', label: 'Facial Recognition', icon: Camera },
    { id: 'reports', label: 'Reports', icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">EduTrack</h1>
                <p className="text-sm text-gray-500">Attendance Management System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
              <div className="h-8 border-l border-gray-300"></div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user.name.charAt(0)}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-700">{user.name}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <nav className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                        activeTab === item.id
                          ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 min-h-[600px]">
              {activeTab === 'dashboard' && <Dashboard />}
              {activeTab === 'departments' && <DepartmentManagement />}
              {activeTab === 'students' && <StudentManagement />}
              {activeTab === 'attendance' && <AttendanceTracking />}
              {activeTab === 'facial' && <FacialRecognition />}
              {activeTab === 'reports' && <Reports />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;