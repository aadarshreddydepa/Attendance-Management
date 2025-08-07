import React, { useState } from 'react';
import { Users, UserCheck, UserX, CheckCircle, Save } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  photo: string;
  status: 'present' | 'absent' | null;
}

const AttendanceTracking = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('Computer Science Engineering');
  const [selectedSection, setSelectedSection] = useState('A');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedPeriod, setSelectedPeriod] = useState('Period 1');
  const [attendanceData, setAttendanceData] = useState<Student[]>([
    {
      id: 'CSE001',
      name: 'Alice Johnson',
      photo: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      status: null
    },
    {
      id: 'CSE002',
      name: 'Bob Smith',
      photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      status: null
    },
    {
      id: 'CSE003',
      name: 'Charlie Brown',
      photo: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      status: null
    },
    {
      id: 'CSE004',
      name: 'Diana Wilson',
      photo: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      status: null
    },
    {
      id: 'CSE005',
      name: 'Edward Davis',
      photo: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      status: null
    },
    {
      id: 'CSE006',
      name: 'Fiona Miller',
      photo: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      status: null
    }
  ]);

  const departments = ['Computer Science Engineering', 'Mechanical Engineering', 'Electronics & Communication', 'Civil Engineering'];
  const sections = ['A', 'B', 'C', 'D'];
  const periods = ['Period 1', 'Period 2', 'Period 3', 'Period 4', 'Period 5', 'Period 6'];

  const presentCount = attendanceData.filter(student => student.status === 'present').length;
  const absentCount = attendanceData.filter(student => student.status === 'absent').length;
  const totalStudents = attendanceData.length;

  const handleStatusChange = (studentId: string, status: 'present' | 'absent') => {
    setAttendanceData(prev =>
      prev.map(student =>
        student.id === studentId ? { ...student, status } : student
      )
    );
  };

  const markAllPresent = () => {
    setAttendanceData(prev =>
      prev.map(student => ({ ...student, status: 'present' as const }))
    );
  };

  const markAllAbsent = () => {
    setAttendanceData(prev =>
      prev.map(student => ({ ...student, status: 'absent' as const }))
    );
  };

  const saveAttendance = () => {
    const unmarkedCount = attendanceData.filter(student => student.status === null).length;
    if (unmarkedCount > 0) {
      alert(`Please mark attendance for all students. ${unmarkedCount} students are unmarked.`);
      return;
    }
    // Here you would save to database
    alert('Attendance saved successfully!');
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Take Attendance</h1>
        <p className="text-gray-600">Mark attendance for students in your class</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{totalStudents}</p>
              <p className="text-gray-600">Total Students</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <UserCheck className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{presentCount}</p>
              <p className="text-gray-600">Present</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <UserX className="h-8 w-8 text-red-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{absentCount}</p>
              <p className="text-gray-600">Absent</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">
                {totalStudents > 0 ? Math.round((presentCount / totalStudents) * 100) : 0}%
              </p>
              <p className="text-gray-600">Attendance Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
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
              {sections.map(section => (
                <option key={section} value={section}>Section {section}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Period</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {periods.map(period => (
                <option key={period} value={period}>{period}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Bulk Actions */}
        <div className="flex space-x-4">
          <button
            onClick={markAllPresent}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center"
          >
            <UserCheck className="h-4 w-4 mr-2" />
            Mark All Present
          </button>
          <button
            onClick={markAllAbsent}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 flex items-center"
          >
            <UserX className="h-4 w-4 mr-2" />
            Mark All Absent
          </button>
        </div>
      </div>

      {/* Students Grid */}
      <div className="bg-white rounded-lg shadow-sm border mb-6">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Students</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {attendanceData.map((student) => (
              <div key={student.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3 mb-3">
                  <img
                    src={student.photo}
                    alt={student.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{student.name}</h3>
                    <p className="text-sm text-gray-500">{student.id}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleStatusChange(student.id, 'present')}
                    className={`flex-1 py-2 px-3 rounded-md text-sm font-medium ${
                      student.status === 'present'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-green-100'
                    }`}
                  >
                    Present
                  </button>
                  <button
                    onClick={() => handleStatusChange(student.id, 'absent')}
                    className={`flex-1 py-2 px-3 rounded-md text-sm font-medium ${
                      student.status === 'absent'
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-red-100'
                    }`}
                  >
                    Absent
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={saveAttendance}
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 flex items-center"
        >
          <Save className="h-5 w-5 mr-2" />
          Save Attendance
        </button>
      </div>
    </div>
  );
};

export default AttendanceTracking;
