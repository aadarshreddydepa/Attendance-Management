import React, { useState } from 'react';
import { Download, BarChart3, PieChart, Filter, FileText, TrendingUp, Users } from 'lucide-react';

const Reports = () => {
  const [selectedReportType, setSelectedReportType] = useState('attendance-summary');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const reportTypes = [
    { id: 'attendance-summary', name: 'Attendance Summary', icon: BarChart3 },
    { id: 'department-wise', name: 'Department-wise Report', icon: PieChart },
    { id: 'section-wise', name: 'Section-wise Report', icon: Users },
    { id: 'student-individual', name: 'Individual Student Report', icon: FileText },
    { id: 'monthly-trends', name: 'Monthly Trends', icon: TrendingUp }
  ];

  const departments = ['Computer Science Engineering', 'Mechanical Engineering', 'Electronics & Communication', 'Civil Engineering'];
  const sections = ['A', 'B', 'C', 'D'];

  // Mock data for reports
  const attendanceSummary = [
    { date: '2024-01-15', present: 2456, absent: 391, percentage: 86.3 },
    { date: '2024-01-16', present: 2502, absent: 345, percentage: 87.9 },
    { date: '2024-01-17', present: 2398, absent: 449, percentage: 84.2 },
    { date: '2024-01-18', present: 2567, absent: 280, percentage: 90.2 },
    { date: '2024-01-19', present: 2445, absent: 402, percentage: 85.9 }
  ];

  const departmentStats = [
    { name: 'Computer Science', attendance: 92.5, students: 640, avgDaily: 592 },
    { name: 'Mechanical', attendance: 88.2, students: 480, avgDaily: 423 },
    { name: 'Electronics', attendance: 90.1, students: 456, avgDaily: 411 },
    { name: 'Civil', attendance: 85.7, students: 320, avgDaily: 274 },
    { name: 'Electrical', attendance: 87.3, students: 432, avgDaily: 377 }
  ];

  const sectionStats = [
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
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Attendance Summary</h3>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Present</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Absent</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Percentage</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {attendanceSummary.map((day, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                      </td>
                      <td className="px-4 py-3 text-sm text-green-600 font-medium">{day.present}</td>
                      <td className="px-4 py-3 text-sm text-red-600 font-medium">{day.absent}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 font-medium">{day.percentage}%</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
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
          </div>
        );

      case 'department-wise':
        return (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Department-wise Attendance</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departmentStats.map((dept, index) => (
                <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <h4 className="font-medium text-gray-900 mb-3">{dept.name}</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Students</span>
                      <span className="font-medium">{dept.students}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Avg Daily Present</span>
                      <span className="font-medium">{dept.avgDaily}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Attendance Rate</span>
                      <span className={`font-medium ${
                        dept.attendance >= 90 ? 'text-green-600' :
                        dept.attendance >= 80 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {dept.attendance}%
                      </span>
                    </div>
                    <div className="mt-3 bg-gray-200 rounded-full h-2">
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
                </div>
              ))}
            </div>
          </div>
        );

      case 'section-wise':
        return (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Section-wise Attendance</h3>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Department</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Section</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Students</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Avg Attendance</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Performance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {sectionStats.map((section, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">{section.department}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Section {section.section}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">{section.students}</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{section.avgAttendance}%</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          section.avgAttendance >= 90 ? 'bg-green-100 text-green-800' :
                          section.avgAttendance >= 80 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {section.avgAttendance >= 90 ? 'Excellent' : 
                           section.avgAttendance >= 80 ? 'Good' : 'Needs Improvement'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Select a report type to view data</p>
          </div>
        );
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Reports & Analytics</h2>
          <p className="text-gray-600">Generate and export attendance reports</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => exportReport('pdf')}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Export PDF</span>
          </button>
          <button
            onClick={() => exportReport('csv')}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Report Types Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Types</h3>
            <div className="space-y-2">
              {reportTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedReportType(type.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                      selectedReportType === type.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-sm font-medium">{type.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
                <select
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Sections</option>
                  {sections.map(section => (
                    <option key={section} value={section}>Section {section}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <button
                onClick={generateReport}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <Filter className="h-4 w-4" />
                <span>Apply Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* Report Content */}
        <div className="lg:col-span-3">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            {renderReportContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;