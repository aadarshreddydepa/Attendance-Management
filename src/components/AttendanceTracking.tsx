import React, { useState } from 'react';
import { Calendar, Clock, Users, UserCheck, UserX, CheckCircle, Save, Filter } from 'lucide-react';

const AttendanceTracking = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('Computer Science Engineering');
  const [selectedSection, setSelectedSection] = useState('A');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedPeriod, setSelectedPeriod] = useState('Period 1');
  const [attendanceData, setAttendanceData] = useState([
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
      prev.map(student => ({ ...student, status: 'present' }))
    );
  };

  const markAllAbsent = () => {
    setAttendanceData(prev => 
      prev.map(student => ({ ...student, status: 'absent' }))
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
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Take Attendance</h2>
        <p className="text-gray-600">Mark attendance for students in your class</p>
      </div>

      {/* Filters */}
      <div className="bg-gray-50 rounded-xl p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Period</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {periods.map(period => (
                <option key={period} value={period}>{period}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{totalStudents}</p>
              <p className="text-sm text-gray-600">Total Students</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <UserCheck className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">{presentCount}</p>
              <p className="text-sm text-gray-600">Present</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-red-50 rounded-lg border border-red-200">
              <UserX className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">{absentCount}</p>
              <p className="text-sm text-gray-600">Absent</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">
                {totalStudents > 0 ? Math.round((presentCount / totalStudents) * 100) : 0}%
              </p>
              <p className="text-sm text-gray-600">Attendance Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={markAllPresent}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2"
        >
          <CheckCircle className="h-4 w-4" />
          <span>Mark All Present</span>
        </button>
        <button
          onClick={markAllAbsent}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center space-x-2"
        >
          <UserX className="h-4 w-4" />
          <span>Mark All Absent</span>
        </button>
        <button
          onClick={saveAttendance}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
        >
          <Save className="h-4 w-4" />
          <span>Save Attendance</span>
        </button>
      </div>

      {/* Student List */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-900">
            {selectedDepartment} - Section {selectedSection} - {selectedPeriod}
          </h3>
          <p className="text-sm text-gray-600 flex items-center space-x-2 mt-1">
            <Calendar className="h-4 w-4" />
            <span>{new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </p>
        </div>
        
        <div className="divide-y divide-gray-200">
          {attendanceData.map((student) => (
            <div key={student.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img 
                    src={student.photo} 
                    alt={student.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                  />
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">{student.name}</h4>
                    <p className="text-sm text-gray-500 font-mono">{student.id}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleStatusChange(student.id, 'present')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      student.status === 'present'
                        ? 'bg-green-600 text-white shadow-md'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    Present
                  </button>
                  <button
                    onClick={() => handleStatusChange(student.id, 'absent')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      student.status === 'absent'
                        ? 'bg-red-600 text-white shadow-md'
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}
                  >
                    Absent
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AttendanceTracking;