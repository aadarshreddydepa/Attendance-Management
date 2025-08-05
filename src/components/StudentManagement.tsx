import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Upload, Users, GraduationCap } from 'lucide-react';

const StudentManagement = () => {
  const [students, setStudents] = useState([
    {
      id: 'CSE001',
      name: 'Alice Johnson',
      email: 'alice.johnson@college.edu',
      department: 'Computer Science Engineering',
      section: 'A',
      year: '3rd Year',
      phone: '+1-234-567-8901',
      photo: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: 'CSE002',
      name: 'Bob Smith',
      email: 'bob.smith@college.edu',
      department: 'Computer Science Engineering',
      section: 'A',
      year: '3rd Year',
      phone: '+1-234-567-8902',
      photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: 'MECH001',
      name: 'Carol Davis',
      email: 'carol.davis@college.edu',
      department: 'Mechanical Engineering',
      section: 'B',
      year: '2nd Year',
      phone: '+1-234-567-8903',
      photo: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: 'ECE001',
      name: 'David Wilson',
      email: 'david.wilson@college.edu',
      department: 'Electronics & Communication',
      section: 'A',
      year: '1st Year',
      phone: '+1-234-567-8904',
      photo: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: 'CIVIL001',
      name: 'Emma Brown',
      email: 'emma.brown@college.edu',
      department: 'Civil Engineering',
      section: 'A',
      year: '4th Year',
      phone: '+1-234-567-8905',
      photo: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [newStudent, setNewStudent] = useState({
    id: '',
    name: '',
    email: '',
    department: '',
    section: '',
    year: '',
    phone: '',
    photo: ''
  });

  const departments = ['Computer Science Engineering', 'Mechanical Engineering', 'Electronics & Communication', 'Civil Engineering', 'Electrical Engineering'];
  const sections = ['A', 'B', 'C', 'D'];
  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === '' || student.department === selectedDepartment;
    const matchesSection = selectedSection === '' || student.section === selectedSection;
    
    return matchesSearch && matchesDepartment && matchesSection;
  });

  const handleAddStudent = () => {
    if (newStudent.name && newStudent.email && newStudent.department) {
      const student = {
        ...newStudent,
        id: newStudent.id || `${newStudent.department.split(' ')[0].toUpperCase()}${String(students.length + 1).padStart(3, '0')}`
      };
      setStudents([...students, student]);
      setNewStudent({ id: '', name: '', email: '', department: '', section: '', year: '', phone: '', photo: '' });
      setShowAddModal(false);
    }
  };

  const handleDeleteStudent = (id: string) => {
    setStudents(students.filter(student => student.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Student Management</h2>
          <p className="text-gray-600">Manage student records and information</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2">
            <Upload className="h-4 w-4" />
            <span>Import CSV</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Student</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Departments</option>
          {departments.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
        
        <select
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Sections</option>
          {sections.map(section => (
            <option key={section} value={section}>Section {section}</option>
          ))}
        </select>

        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Users className="h-4 w-4" />
          <span>{filteredStudents.length} students</span>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Section</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={student.photo} 
                        alt={student.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{student.name}</p>
                        <p className="text-sm text-gray-500">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-mono text-gray-900 bg-gray-100 px-2 py-1 rounded">
                      {student.id}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Section {student.section}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.year}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded transition-colors duration-200">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteStudent(student.id)}
                        className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded transition-colors duration-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Student</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Student ID (Optional)</label>
                <input
                  type="text"
                  value={newStudent.id}
                  onChange={(e) => setNewStudent({...newStudent, id: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Auto-generated if empty"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={newStudent.email}
                  onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={newStudent.phone}
                  onChange={(e) => setNewStudent({...newStudent, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <select
                  value={newStudent.department}
                  onChange={(e) => setNewStudent({...newStudent, department: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
                <select
                  value={newStudent.section}
                  onChange={(e) => setNewStudent({...newStudent, section: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Section</option>
                  {sections.map(section => (
                    <option key={section} value={section}>Section {section}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                <select
                  value={newStudent.year}
                  onChange={(e) => setNewStudent({...newStudent, year: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Year</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL</label>
                <input
                  type="url"
                  value={newStudent.photo}
                  onChange={(e) => setNewStudent({...newStudent, photo: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com/photo.jpg"
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleAddStudent}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Add Student
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentManagement;