"use client";
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function LeavePage() {
  const [leaves, setLeaves] = useState([
    { id: 1, reason: "Medical Checkup", type: "Sick Leave", from: "2026-05-10", to: "2026-05-11", status: "Approved" },
    { id: 2, reason: "Brother's Wedding", type: "Casual Leave", from: "2026-06-15", to: "2026-06-20", status: "Pending" },
  ]);

  const [formData, setFormData] = useState({ reason: "", type: "Sick Leave", from: "", to: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLeave = {
      id: Date.now(),
      ...formData,
      status: "Pending"
    };
    setLeaves([newLeave, ...leaves]);
    toast.success("Request Sent to Admin! 🚀");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <Toaster position="top-right" />

      {/* 1. APPLY FORM CARD */}
      <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
        <div className="mb-8">
          <h2 className="text-2xl font-black text-gray-900 tracking-tighter uppercase">Apply for Leave</h2>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Submit your request for approval</p>
        </div>
        
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Reason</label>
            <input 
              type="text" 
              placeholder="e.g. Family Emergency" 
              className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-4 ring-purple-100 font-bold transition-all" 
              required 
              onChange={(e) => setFormData({...formData, reason: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Leave Type</label>
            <select 
              className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-4 ring-purple-100 font-bold transition-all"
              onChange={(e) => setFormData({...formData, type: e.target.value})}
            >
              <option>Sick Leave</option>
              <option>Casual Leave</option>
              <option>Annual Leave</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-400 ml-2">From Date</label>
            <input 
              type="date" 
              className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-4 ring-purple-100 font-bold transition-all text-gray-500" 
              required 
              onChange={(e) => setFormData({...formData, from: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-400 ml-2">To Date</label>
            <input 
              type="date" 
              className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-4 ring-purple-100 font-bold transition-all text-gray-500" 
              required 
              onChange={(e) => setFormData({...formData, to: e.target.value})}
            />
          </div>

          <button type="submit" className="md:col-span-2 bg-[#1e1b4b] text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-[#7C3AED] transition-all active:scale-95 mt-4">
            Send Request
          </button>
        </form>
      </div>

      {/* 2. LEAVE HISTORY TABLE */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-50">
          <h3 className="font-black text-gray-900 uppercase tracking-tighter">My Leave History</h3>
        </div>
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-[10px] font-black uppercase text-gray-400 tracking-widest">
            <tr>
              <th className="px-8 py-5">Reason</th>
              <th className="px-8 py-5">Type</th>
              <th className="px-8 py-5">Duration</th>
              <th className="px-8 py-5 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {leaves.map((leave) => (
              <tr key={leave.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-8 py-6 font-bold text-gray-700">{leave.reason}</td>
                <td className="px-8 py-6 text-sm text-gray-500 font-medium">{leave.type}</td>
                <td className="px-8 py-6 text-sm text-gray-400 font-bold uppercase tracking-tighter">{leave.from} <span className="text-purple-300">→</span> {leave.to}</td>
                <td className="px-8 py-6 text-center">
                  <span className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    leave.status === 'Approved' ? 'bg-emerald-50 text-emerald-600' : 
                    leave.status === 'Pending' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'
                  }`}>
                    {leave.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}