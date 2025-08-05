import React, { useState } from 'react';
import { Plus, Building2, Edit, Trash2, Search } from 'lucide-react';

const DepartmentManagement = () => {
  const [departments, setDepartments] = useState([
    {
      id: 1,
      name: 'Computer Science Engineering',
      code: 'CSE',
      hod: 'Dr. Sarah Johnson',
      sections: 4,
      students: 640,
      faculty: 28,
      established: '2010'
    },
    {
      id: 2,
      name: 'Mechanical Engineering',
      code: 'MECH',
      hod: 'Dr. Michael Chen',
      sections: 3,
      students: 480,
      faculty: 22,
      established: '2008'
    },
    {
      id: 3,
      name: 'Electronics & Communication',
      code: 'ECE',
      hod: 'Dr. Priya Sharma',
      sections: 3,
      students: 456,
      faculty: 25,
      established: '2009'
    },
    {
      id: 4,
      name: 'Civil Engineering',
      code: 'CIVIL',
      hod: 'Dr. Robert Taylor',
      sections: 2,
      students: 320,
      faculty: 18,
      established: '2005'
    },
    {
      id: 5,
      name: 'Electrical Engineering',
      code: 'EEE',
      hod: 'Dr. Lisa Anderson',
      sections: 3,
      students: 432,
      faculty: 24,
      established: '2007'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newDepartment, setNewDepartment] = useState({
    name: '',
    code: '',
    hod: '',
    sections: '',
    established: ''
  });

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.hod.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddDepartment = () => {
    if (newDepartment.name && newDepartment.code && newDepartment.hod) {
      const department = {
        id: departments.length + 1,
        ...newDepartment,
        sections: parseInt(newDepartment.sections) || 0,
        students: 0,
        faculty: 0
      };
      setDepartments([...departments, department]);
      setNewDepartment({ name: '', code: '', hod: '', sections: '', established: '' });
      setShowAddModal(false);
    }
  };

  const handleDeleteDepartment = (id: number) => {
    setDepartments(departments.filter(dept => dept.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Department Management</h2>
          <p className="text-gray-600">Manage college departments and their information</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Department</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search departments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredDepartments.map((department) => (
          <div key={department.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                  <Edit className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => handleDeleteDepartment(department.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{department.name}</h3>
              <p className="text-sm text-gray-600 mb-2">Code: {department.code}</p>
              <p className="text-sm text-gray-600">HOD: {department.hod}</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{department.sections}</p>
                <p className="text-xs text-gray-500">Sections</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{department.students}</p>
                <p className="text-xs text-gray-500">Students</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">{department.faculty}</p>
                <p className="text-xs text-gray-500">Faculty</p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500">Established: {department.established}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Add Department Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Department</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department Name</label>
                <input
                  type="text"
                  value={newDepartment.name}
                  onChange={(e) => setNewDepartment({...newDepartment, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Information Technology"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department Code</label>
                <input
                  type="text"
                  value={newDepartment.code}
                  onChange={(e) => setNewDepartment({...newDepartment, code: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., IT"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Head of Department</label>
                <input
                  type="text"
                  value={newDepartment.hod}
                  onChange={(e) => setNewDepartment({...newDepartment, hod: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Dr. John Smith"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sections</label>
                  <input
                    type="number"
                    value={newDepartment.sections}
                    onChange={(e) => setNewDepartment({...newDepartment, sections: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Established</label>
                  <input
                    type="text"
                    value={newDepartment.established}
                    onChange={(e) => setNewDepartment({...newDepartment, established: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="2024"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleAddDepartment}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Add Department
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

export default DepartmentManagement;