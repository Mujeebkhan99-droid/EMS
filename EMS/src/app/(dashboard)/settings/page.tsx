"use client";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function SettingsPage() {
  const [adminData, setAdminData] = useState({
    name: "Mujeeb",
    email: "admin@pulsehr.com",
    role: "Super Admin",
  });

  const [notifications, setNotifications] = useState(true);

  const handleSave = () => {
    toast.success("Profile Settings Updated! ⚙️");
  };

  return (
    <div className="max-w-4xl space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="px-2">
        <h1 className="text-4xl font-black text-gray-900 tracking-tighter">System Settings</h1>
        <p className="text-gray-500 font-medium">Manage your profile and system preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left: Profile Card */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm text-center">
            <div className="w-24 h-24 bg-gradient-to-tr from-[#7C3AED] to-[#A855F7] rounded-[2rem] mx-auto mb-6 flex items-center justify-center text-3xl text-white font-black shadow-xl shadow-purple-100">
              {adminData.name[0]}
            </div>
            <h3 className="text-xl font-black text-gray-800">{adminData.name}</h3>
            <p className="text-xs font-bold text-[#7C3AED] uppercase tracking-widest mt-1">{adminData.role}</p>
          </div>

          <div className="bg-[#1e1b4b] p-8 rounded-[2.5rem] text-white">
            <p className="text-[10px] font-black uppercase opacity-50 tracking-[0.2em] mb-4">Account Status</p>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
              <p className="font-bold text-sm">Verified Professional</p>
            </div>
          </div>
        </div>

        {/* Right: Form & Options */}
        <div className="md:col-span-2 space-y-8">
          {/* Profile Form */}
          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
            <h3 className="text-xl font-black text-gray-800 mb-8 tracking-tight">Admin Information</h3>
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Display Name</label>
                <input 
                  type="text" 
                  value={adminData.name}
                  onChange={(e) => setAdminData({...adminData, name: e.target.value})}
                  className="w-full p-5 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#7C3AED]/20 font-bold text-gray-700" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Email Address</label>
                <input 
                  type="email" 
                  value={adminData.email}
                  disabled
                  className="w-full p-5 bg-gray-100 rounded-2xl outline-none font-bold text-gray-400 cursor-not-allowed" 
                />
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
            <h3 className="text-xl font-black text-gray-800 mb-8 tracking-tight">Preferences</h3>
            <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-all cursor-pointer">
              <div>
                <p className="font-bold text-gray-800">Email Notifications</p>
                <p className="text-xs text-gray-400 font-medium">Get reports via email</p>
              </div>
              <button 
                onClick={() => setNotifications(!notifications)}
                className={`w-14 h-8 rounded-full transition-all flex items-center px-1 ${notifications ? 'bg-[#7C3AED]' : 'bg-gray-200'}`}
              >
                <div className={`w-6 h-6 bg-white rounded-full shadow-sm transition-all ${notifications ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </button>
            </div>
          </div>

          {/* Save Button */}
          <button 
            onClick={handleSave}
            className="w-full bg-[#7C3AED] text-white py-6 rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-purple-100 hover:scale-[1.02] active:scale-95 transition-all"
          >
            Save All Changes
          </button>
        </div>

      </div>
    </div>
  );
}