"use client";
import { useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: "Mujeeb Khan",
    role: "Admin",
    email: "admin@pulsehr.com",
    phone: "+92 300 1234567",
    joined: "January 2024",
    avatar: "👤"
  });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        {/* Profile Header */}
        <div className="h-32 bg-gradient-to-r from-purple-600 to-indigo-600"></div>
        
        <div className="px-10 pb-10">
          <div className="relative -mt-16 mb-6">
            <div className="w-32 h-32 bg-white rounded-3xl shadow-xl flex items-center justify-center text-5xl border-4 border-white">
              {user.avatar}
            </div>
          </div>

          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-black text-gray-800">{user.name}</h1>
              <p className="text-purple-600 font-bold uppercase text-xs tracking-widest mt-1">{user.role}</p>
            </div>
            <button className="bg-gray-100 text-gray-600 px-6 py-2 rounded-xl font-bold hover:bg-gray-200 transition-all">
              Edit Profile
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            <div className="space-y-4">
              <label className="block">
                <span className="text-gray-400 text-xs font-bold uppercase">Email Address</span>
                <p className="text-gray-700 font-semibold border-b py-2">{user.email}</p>
              </label>
              <label className="block">
                <span className="text-gray-400 text-xs font-bold uppercase">Phone Number</span>
                <p className="text-gray-700 font-semibold border-b py-2">{user.phone}</p>
              </label>
            </div>
            <div className="space-y-4">
              <label className="block">
                <span className="text-gray-400 text-xs font-bold uppercase">Member Since</span>
                <p className="text-gray-700 font-semibold border-b py-2">{user.joined}</p>
              </label>
              <label className="block">
                <span className="text-gray-400 text-xs font-bold uppercase">Department</span>
                <p className="text-gray-700 font-semibold border-b py-2">Administration</p>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}