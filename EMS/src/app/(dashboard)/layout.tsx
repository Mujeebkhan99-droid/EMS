"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "@/src/components/Shared/Sidebar";

// Sample Notifications Data
const notificationsData = [
  { id: 1, text: "Ali marked attendance late today.", time: "2 mins ago" },
  { id: 2, text: "New leave request from Sarah.", time: "1 hour ago" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  
  // States for dropdowns
  const [showProfile, setShowProfile] = useState(false);
  const [showBell, setShowBell] = useState(false);

  // Auto-close dropdowns when page changes
  useEffect(() => {
    setShowProfile(false);
    setShowBell(false);
  }, [pathname]);

  // Sign Out Logic
  const handleSignOut = () => {
    if (confirm("Are you sure you want to sign out?")) {
      localStorage.clear();
      router.push("/login");
    }
  };

  // Search Logic (Updates URL for Employees/Departments page)
  const handleSearch = (term: string) => {
    router.push(`${pathname}?search=${term}`);
  };

  return (
    <div className="flex min-h-screen bg-[#F3F4F9] w-full font-sans">
      <Sidebar /> 
      
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* --- NAVBAR HEADER --- */}
        <header className="flex items-center justify-between py-6 px-10 bg-[#F3F4F9] relative">
          
          {/* SEARCH BAR */}
          <div className="relative w-96 group">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 opacity-30 group-focus-within:opacity-100 transition-opacity">🔍</span>
            <input 
              type="text" 
              placeholder="Search employees, reports..." 
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full bg-white border-none py-4 pl-14 pr-6 rounded-2xl shadow-sm focus:ring-4 focus:ring-[#7C3AED]/10 outline-none font-bold text-sm text-gray-600 transition-all"
            />
          </div>
          
          <div className="flex items-center gap-4">
            {/* NOTIFICATION BELL */}
            <div className="relative">
              <button 
                onClick={() => { setShowBell(!showBell); setShowProfile(false); }}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm transition-all relative ${showBell ? 'bg-[#7C3AED] text-white' : 'bg-white text-gray-400 hover:bg-gray-50'}`}
              >
                <span className="text-xl">🔔</span>
                <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
              </button>

              {showBell && (
                <div className="absolute top-16 right-0 w-80 bg-white rounded-[2.5rem] shadow-2xl p-6 z-[100] border border-gray-100 animate-in slide-in-from-top-5 duration-300">
                  <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest mb-4">Recent Alerts</h3>
                  <div className="space-y-3">
                    {notificationsData.map((note) => (
                      <div key={note.id} className="p-4 bg-gray-50 rounded-2xl hover:bg-purple-50 transition-colors cursor-pointer">
                        <p className="text-[11px] font-bold text-gray-700 leading-tight">{note.text}</p>
                        <p className="text-[9px] font-black text-gray-300 uppercase mt-2 tracking-widest">{note.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* PROFILE DROPDOWN */}
            <div className="relative">
              <button 
                onClick={() => { setShowProfile(!showProfile); setShowBell(false); }}
                className="w-12 h-12 bg-[#7C3AED] rounded-2xl shadow-lg shadow-purple-200 text-white font-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
              >
                M
              </button>

              {showProfile && (
                <div className="absolute top-16 right-0 w-52 bg-white rounded-[2rem] shadow-2xl p-4 z-[100] border border-gray-100 flex flex-col gap-1 animate-in slide-in-from-top-5 duration-300">
                  <div className="px-4 py-3 border-b border-gray-50 mb-2">
                    <p className="text-xs font-black text-gray-800">Mujeeb Admin</p>
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Administrator</p>
                  </div>
                  <button className="w-full text-left p-3 hover:bg-gray-50 rounded-xl text-[10px] font-black text-gray-700 uppercase tracking-widest transition-colors">
                    ⚙️ Settings
                  </button>
                  <button 
                    onClick={handleSignOut}
                    className="w-full text-left p-3 hover:bg-red-50 rounded-xl text-[10px] font-black text-red-500 uppercase tracking-widest transition-colors"
                  >
                    ➡️ Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
        
        {/* MAIN CONTENT */}
        <main className="px-10 pb-10">
          {children}
        </main>
      </div>
    </div>
  );
}