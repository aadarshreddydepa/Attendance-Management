import React, { useState } from 'react';
import { Plus, Building2, Edit, Trash2, Search } from 'lucide-react';

interface Department {
  id: number;
  name: string;
  code: string;
  hod: string;
  sections: number;
  students: number;
  faculty: number;
  established: string;
}

interface NewDepartment {
  name: string;
  code: string;
  hod: string;
  sections: string;
  established: string;
}

const DepartmentManagement = () => {
  const [departments, setDepartments] = useState<Department[]>([
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
  const [newDepartment, setNewDepartment] = useState<NewDepartment>({
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
      const department: Department = {
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
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Department Management</h1>
        <p className="text-gray-600">Manage college departments and their information</p>
      </div>

      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search departments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Department
        </button>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDepartments.map((department) => (
          <div key={department.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <Building2 className="h-8 w-8 text-blue-600" />
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold text-gray-900">{department.name}</h3>
                    <p className="text-sm text-gray-500">Code: {department.code}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="text-gray-400 hover:text-blue-600">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteDepartment(department.id)}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600">HOD: {department.hod}</p>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-blue-600">{department.sections}</p>
                  <p className="text-xs text-gray-500">Sections</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">{department.students}</p>
                  <p className="text-xs text-gray-500">Students</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-600">{department.faculty}</p>
                  <p className="text-xs text-gray-500">Faculty</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-gray-500">Established: {department.established}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Department Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Department</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department Name</label>
                <input
                  type="text"
                  value={newDepartment.name}
                  onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter department name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department Code</label>
                <input
                  type="text"
                  value={newDepartment.code}
                  onChange={(e) => setNewDepartment({ ...newDepartment, code: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter department code"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Head of Department</label>
                <input
                  type="text"
                  value={newDepartment.hod}
                  onChange={(e) => setNewDepartment({ ...newDepartment, hod: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter HOD name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Sections</label>
                <input
                  type="number"
                  value={newDepartment.sections}
                  onChange={(e) => setNewDepartment({ ...newDepartment, sections: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter number of sections"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Established Year</label>
                <input
                  type="text"
                  value={newDepartment.established}
                  onChange={(e) => setNewDepartment({ ...newDepartment, established: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter established year"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddDepartment}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add Department
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentManagement;
