import React from 'react';
import { Users, UserCheck, UserX, TrendingUp, Calendar, Award, Building2, BookOpen } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Students',
      value: '2,847',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Present Today',
      value: '2,456',
      change: '86.3%',
      trend: 'up',
      icon: UserCheck,
      color: 'green'
    },
    {
      title: 'Absent Today',
      value: '391',
      change: '13.7%',
      trend: 'down',
      icon: UserX,
      color: 'red'
    },
    {
      title: 'Departments',
      value: '8',
      change: 'Active',
      trend: 'stable',
      icon: Building2,
      color: 'purple'
    }
  ];

  const recentActivity = [
    { time: '09:30 AM', action: 'Computer Science - Section A attendance completed', students: 45 },
    { time: '10:15 AM', action: 'Mechanical Engineering - Section B attendance completed', students: 38 },
    { time: '11:00 AM', action: 'Electronics - Section A attendance completed', students: 42 },
    { time: '11:45 AM', action: 'Civil Engineering - Section C attendance completed', students: 35 },
  ];

  const departmentStats = [
    { name: 'Computer Science', sections: 4, students: 640, attendance: 92 },
    { name: 'Mechanical', sections: 3, students: 480, attendance: 88 },
    { name: 'Electronics', sections: 3, students: 456, attendance: 90 },
    { name: 'Civil', sections: 2, students: 320, attendance: 85 },
    { name: 'Electrical', sections: 3, students: 432, attendance: 87 },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Overview</h2>
        <p className="text-gray-600">Monitor attendance across all departments and sections</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: 'bg-blue-50 text-blue-600 border-blue-200',
            green: 'bg-green-50 text-green-600 border-green-200',
            red: 'bg-red-50 text-red-600 border-red-200',
            purple: 'bg-purple-50 text-purple-600 border-purple-200'
          };

          return (
            <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg border ${colorClasses[stat.color]}`}>
                  <Icon className="h-6 w-6" />
                </div>
                {stat.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-500" />}
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600 mb-2">{stat.title}</p>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  stat.trend === 'up' ? 'bg-green-100 text-green-800' : 
                  stat.trend === 'down' ? 'bg-red-100 text-red-800' : 
                  'bg-gray-100 text-gray-800'
                }`}>
                  {stat.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Calendar className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-white rounded-lg border border-gray-200">
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-xs text-gray-500">{activity.time}</span>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {activity.students} students
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Department Stats */}
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Award className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Department Performance</h3>
          </div>
          <div className="space-y-4">
            {departmentStats.map((dept, index) => (
              <div key={index} className="p-4 bg-white rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">{dept.name}</h4>
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    dept.attendance >= 90 ? 'bg-green-100 text-green-800' :
                    dept.attendance >= 80 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {dept.attendance}%
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{dept.sections} sections</span>
                  <span>{dept.students} students</span>
                </div>
                <div className="mt-2 bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      dept.attendance >= 90 ? 'bg-green-500' :
                      dept.attendance >= 80 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${dept.attendance}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;