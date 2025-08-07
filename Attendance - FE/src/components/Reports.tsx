/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Download, BarChart3, PieChart, Filter, FileText, TrendingUp, Users } from 'lucide-react';

interface ReportType {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
}

interface AttendanceDay {
  date: string;
  present: number;
  absent: number;
  percentage: number;
}

interface DepartmentStat {
  name: string;
  attendance: number;
  students: number;
  avgDaily: number;
}

interface SectionStat {
  department: string;
  section: string;
  students: number;
  avgAttendance: number;
}

const Reports = () => {
  const [selectedReportType, setSelectedReportType] = useState('attendance-summary');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const reportTypes: ReportType[] = [
    { id: 'attendance-summary', name: 'Attendance Summary', icon: BarChart3 },
    { id: 'department-wise', name: 'Department-wise Report', icon: PieChart },
    { id: 'section-wise', name: 'Section-wise Report', icon: Users },
    { id: 'student-individual', name: 'Individual Student Report', icon: FileText },
    { id: 'monthly-trends', name: 'Monthly Trends', icon: TrendingUp }
  ];

  const departments = ['Computer Science Engineering', 'Mechanical Engineering', 'Electronics & Communication', 'Civil Engineering'];
  const sections = ['A', 'B', 'C', 'D'];

  // Mock data for reports
  const attendanceSummary: AttendanceDay[] = [
    { date: '2024-01-15', present: 2456, absent: 391, percentage: 86.3 },
    { date: '2024-01-16', present: 2502, absent: 345, percentage: 87.9 },
    { date: '2024-01-17', present: 2398, absent: 449, percentage: 84.2 },
    { date: '2024-01-18', present: 2567, absent: 280, percentage: 90.2 },
    { date: '2024-01-19', present: 2445, absent: 402, percentage: 85.9 }
  ];

  const departmentStats: DepartmentStat[] = [
    { name: 'Computer Science', attendance: 92.5, students: 640, avgDaily: 592 },
    { name: 'Mechanical', attendance: 88.2, students: 480, avgDaily: 423 },
    { name: 'Electronics', attendance: 90.1, students: 456, avgDaily: 411 },
    { name: 'Civil', attendance: 85.7, students: 320, avgDaily: 274 },
    { name: 'Electrical', attendance: 87.3, students: 432, avgDaily: 377 }
  ];

  const sectionStats: SectionStat[] = [
    { department: 'Computer Science', section: 'A', students: 160, avgAttendance: 94.2 },
    { department: 'Computer Science', section: 'B', students: 160, avgAttendance: 91.8 },
    { department: 'Computer Science', section: 'C', students: 160, avgAttendance: 89.5 },
    { department: 'Computer Science', section: 'D', students: 160, avgAttendance: 95.1 },
    { department: 'Mechanical', section: 'A', students: 160, avgAttendance: 89.2 },
    { department: 'Mechanical', section: 'B', students: 160, avgAttendance: 86.5 },
    { department: 'Mechanical', section: 'C', students: 160, avgAttendance: 88.9 }
  ];

  const generateReport = () => {
    alert(`Generating ${reportTypes.find(r => r.id === selectedReportType)?.name} report...`);
  };

  const exportReport = (format: string) => {
    alert(`Exporting report as ${format.toUpperCase()}...`);
  };

  const renderReportContent = () => {
    switch (selectedReportType) {
      case 'attendance-summary':
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Present</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Absent</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {attendanceSummary.map((day, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(day.date).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{day.present}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{day.absent}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{day.percentage}%</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        day.percentage >= 90 ? 'bg-green-100 text-green-800' : 
                        day.percentage >= 80 ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {day.percentage >= 90 ? 'Excellent' : day.percentage >= 80 ? 'Good' : 'Poor'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      
      case 'section-wise':
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Section</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Attendance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sectionStats.map((section, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{section.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Section {section.section}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{section.students}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{section.avgAttendance}%</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        section.avgAttendance >= 90 ? 'bg-green-100 text-green-800' : 
                        section.avgAttendance >= 80 ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {section.avgAttendance >= 90 ? 'Excellent' : section.avgAttendance >= 80 ? 'Good' : 'Needs Improvement'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      
      default:
        return (
          <div className="text-center py-8 text-gray-500">
            Select a report type to view data
          </div>
        );
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports & Analytics</h1>
        <p className="text-gray-600">Generate and export attendance reports</p>
      </div>

      {/* Report Type Selection */}
      <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Report Type</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {reportTypes.map((type) => {
            const IconComponent = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => setSelectedReportType(type.id)}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  selectedReportType === type.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <IconComponent className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                <p className="text-sm font-medium text-gray-900">{type.name}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Section</label>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Sections</option>
              {sections.map(section => (
                <option key={section} value={section}>Section {section}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={generateReport}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Generate Report
          </button>

          <div className="flex space-x-2">
            <button
              onClick={() => exportReport('pdf')}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 flex items-center"
            >
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </button>
            <button
              onClick={() => exportReport('excel')}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Excel
            </button>
          </div>
        </div>
      </div>

      {/* Report Content */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {reportTypes.find(r => r.id === selectedReportType)?.name}
          </h2>
        </div>
        <div className="p-6">
          {renderReportContent()}
        </div>
      </div>
    </div>
  );
};

export default Reports;
