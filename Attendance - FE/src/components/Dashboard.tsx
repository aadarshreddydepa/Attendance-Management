/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Users, UserCheck, UserX, Building2 } from 'lucide-react';

interface StatItem {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  icon: React.ComponentType<any>;
  color: string;
}

interface Activity {
  time: string;
  action: string;
  students: number;
}

interface DepartmentStat {
  name: string;
  sections: number;
  students: number;
  attendance: number;
}

const Dashboard = () => {
  const stats: StatItem[] = [
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

  const recentActivity: Activity[] = [
    {
      time: '09:30 AM',
      action: 'Computer Science - Section A attendance completed',
      students: 45
    },
    {
      time: '10:15 AM',
      action: 'Mechanical Engineering - Section B attendance completed',
      students: 38
    },
    {
      time: '11:00 AM',
      action: 'Electronics - Section A attendance completed',
      students: 42
    },
    {
      time: '11:45 AM',
      action: 'Civil Engineering - Section C attendance completed',
      students: 35
    },
  ];

  const departmentStats: DepartmentStat[] = [
    { name: 'Computer Science', sections: 4, students: 640, attendance: 92 },
    { name: 'Mechanical', sections: 3, students: 480, attendance: 88 },
    { name: 'Electronics', sections: 3, students: 456, attendance: 90 },
    { name: 'Civil', sections: 2, students: 320, attendance: 85 },
    { name: 'Electrical', sections: 3, students: 432, attendance: 87 },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Monitor attendance across all departments and sections</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                  <IconComponent className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-gray-600">{stat.title}</p>
                  <p className={`text-sm ${stat.trend === 'up' ? 'text-green-600' : stat.trend === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
                    {stat.change}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time} • {activity.students} students</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Department Overview */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">Department Overview</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {departmentStats.map((dept, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{dept.name}</p>
                    <p className="text-sm text-gray-500">{dept.sections} sections • {dept.students} students</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{dept.attendance}%</p>
                    <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${dept.attendance}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
