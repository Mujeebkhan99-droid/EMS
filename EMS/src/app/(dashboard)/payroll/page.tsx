"use client";
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function PayrollPage() {
  // Dummy data (Baad mein isay MongoDB se connect karenge)
  const [employees] = useState([
    { id: 1, name: "Ali Ahmed", role: "Developer", basicSalary: 85000, leaves: 2 },
    { id: 2, name: "Sara Khan", role: "Designer", basicSalary: 65000, leaves: 0 },
    { id: 3, name: "Mujeeb", role: "Admin", basicSalary: 95000, leaves: 1 },
  ]);

  const calculateNetSalary = (basic: number, leaves: number) => {
    const perDay = basic / 30;
    const deduction = perDay * leaves;
    return Math.round(basic - deduction);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="flex justify-between items-end px-2">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">Payroll <span className="text-[#7C3AED]">System</span></h1>
          <p className="text-gray-500 font-medium italic">Salary disbursement for May 2026</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-right">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Payout</p>
          <p className="text-xl font-black text-[#7C3AED]">Rs. 245,000</p>
        </div>
      </div>

      {/* Salary Table */}
      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
            <tr>
              <th className="px-10 py-6">Employee</th>
              <th className="px-10 py-6">Basic Salary</th>
              <th className="px-10 py-6">Leaves (Deduction)</th>
              <th className="px-10 py-6">Net Payable</th>
              <th className="px-10 py-6 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {employees.map((emp) => (
              <tr key={emp.id} className="hover:bg-gray-50/50 transition-all group">
                <td className="px-10 py-6">
                  <p className="font-black text-gray-800 text-sm">{emp.name}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">{emp.role}</p>
                </td>
                <td className="px-10 py-6 font-bold text-gray-600">Rs. {emp.basicSalary.toLocaleString()}</td>
                <td className="px-10 py-6">
                  <span className="text-red-500 font-bold text-sm">-{emp.leaves} Days</span>
                </td>
                <td className="px-10 py-6">
                  <p className="text-lg font-black text-gray-900">Rs. {calculateNetSalary(emp.basicSalary, emp.leaves).toLocaleString()}</p>
                </td>
                <td className="px-10 py-6 text-center">
                  <button 
                    onClick={() => toast.success(`Salary Slip sent to ${emp.name}!`)}
                    className="bg-[#7C3AED] text-white px-6 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-md shadow-purple-100"
                  >
                    Pay Now
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Info Card */}
      <div className="bg-amber-50 border border-amber-100 p-8 rounded-[2.5rem] flex items-start gap-6">
        <span className="text-3xl">💡</span>
        <div>
          <h4 className="font-black text-amber-800 uppercase text-sm tracking-tight">Pro Tip for Admin</h4>
          <p className="text-amber-700 text-xs font-medium leading-relaxed mt-1">
            System automatically calculates deductions based on approved leaves. 
            Final payouts are generated on the 28th of every month.
          </p>
        </div>
      </div>
    </div>
  );
}