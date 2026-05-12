"use client";
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState([
    { id: 1, name: "Information Technology", totalEmployees: 45 },
    { id: 2, name: "Human Resources", totalEmployees: 12 },
    { id: 3, name: "Finance", totalEmployees: 8 },
    { id: 4, name: "Marketing", totalEmployees: 15 },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // Edit track karne ke liye
  const [currentDeptId, setCurrentDeptId] = useState<number | null>(null);
  const [newDeptName, setNewDeptName] = useState("");

  // 1. Add or Update Function
  const handleSaveDept = () => {
    if (!newDeptName) return toast.error("Please enter a name");

    if (isEditMode && currentDeptId) {
      // UPDATE LOGIC
      setDepartments(departments.map(d => 
        d.id === currentDeptId ? { ...d, name: newDeptName } : d
      ));
      toast.success("Department updated!");
    } else {
      // ADD LOGIC
      const newDept = {
        id: Date.now(),
        name: newDeptName,
        totalEmployees: 0
      };
      setDepartments([...departments, newDept]);
      toast.success("Department added successfully!");
    }

    closeModal();
  };

  // 2. Open Edit Modal
  const openEditModal = (dept: any) => {
    setIsEditMode(true);
    setCurrentDeptId(dept.id);
    setNewDeptName(dept.name);
    setIsModalOpen(true);
  };

  // 3. Close Modal Reset
  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setNewDeptName("");
    setCurrentDeptId(null);
  };

  const handleDelete = (id: number) => {
    if (confirm("Kya aap waqai ye department delete karna chahte hain?")) {
      setDepartments(departments.filter(d => d.id !== id));
      toast.success("Department removed.");
    }
  };

  return (
    <div className="space-y-6 p-4">
      <Toaster position="top-right" />
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Departments</h1>
          <p className="text-gray-500 text-sm">Manage your company units</p>
        </div>
        <button 
          onClick={() => { setIsEditMode(false); setIsModalOpen(true); }}
          className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-700 shadow-lg transition-all"
        >
          + Add Department
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-400 text-xs uppercase font-bold tracking-wider">
            <tr>
              <th className="px-6 py-4">Department Name</th>
              <th className="px-6 py-4">Total Employees</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {departments.map((dept) => (
              <tr key={dept.id} className="hover:bg-indigo-50/30 transition-colors group">
                <td className="px-6 py-4 font-semibold text-slate-700">{dept.name}</td>
                <td className="px-6 py-4 text-slate-600">
                  <span className="bg-slate-100 px-3 py-1 rounded-full text-xs font-bold">{dept.totalEmployees} Members</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-3">
                    <button 
                      onClick={() => openEditModal(dept)}
                      className="text-sm font-bold text-indigo-500 hover:text-indigo-700 underline-offset-4 hover:underline"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(dept.id)}
                      className="text-sm font-bold text-red-400 hover:text-red-600 underline-offset-4 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- MODAL (For both Add and Edit) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl animate-in zoom-in-95 duration-200">
            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter mb-2">
              {isEditMode ? "Edit Unit" : "New Unit"}
            </h2>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-8">
              {isEditMode ? "Update department name" : "Enter department details"}
            </p>
            
            <div className="space-y-6">
              <input 
                autoFocus
                type="text" 
                value={newDeptName}
                onChange={(e) => setNewDeptName(e.target.value)}
                className="w-full p-5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-indigo-100 outline-none font-bold"
                placeholder="e.g. Finance or HR"
              />

              <div className="flex gap-4 pt-4">
                <button 
                  onClick={closeModal}
                  className="flex-1 bg-gray-100 text-gray-500 p-5 rounded-2xl font-black text-xs uppercase"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveDept}
                  className="flex-1 bg-indigo-600 text-white p-5 rounded-2xl font-black text-xs uppercase shadow-lg shadow-indigo-100"
                >
                  {isEditMode ? "Update" : "Save Dept"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}