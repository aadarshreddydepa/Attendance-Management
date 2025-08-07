import React, { useState } from 'react';
import { Users, BarChart3, Camera, UserCheck, Building2, BookOpen } from 'lucide-react';
import Dashboard from './components/Dashboard';
import StudentManagement from './components/StudentManagement';
import AttendanceTracking from './components/AttendanceTracking';
import FacialRecognition from './components/FacialRecognition';
import Reports from './components/Reports';
import DepartmentManagement from './components/DepartmentManagement';

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
}

interface User {
  role: string;
  name: string;
}

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user] = useState<User>({ role: 'admin', name: 'Admin User' });

  const navigationItems: NavigationItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'departments', label: 'Departments', icon: Building2 },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'attendance', label: 'Take Attendance', icon: UserCheck },
    { id: 'facial', label: 'Facial Recognition', icon: Camera },
    { id: 'reports', label: 'Reports', icon: BookOpen },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'departments':
        return <DepartmentManagement />;
      case 'students':
        return <StudentManagement />;
      case 'attendance':
        return <AttendanceTracking />;
      case 'facial':
        return <FacialRecognition />;
      case 'reports':
        return <Reports />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">EduTrack</h1>
                  <p className="text-sm text-gray-500">Attendance Management System</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user.role}</p>
              </div>
              <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user.name.charAt(0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white shadow-sm min-h-screen">
          <div className="p-4">
            <div className="space-y-2">
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === item.id
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <IconComponent className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;
