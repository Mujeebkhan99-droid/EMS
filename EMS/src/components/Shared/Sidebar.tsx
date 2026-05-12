"use client";
import { useState, useEffect } from "react"; // 1. useEffect add kiya
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Dashboard", href: "/", icon: "📊" },
  { name: "Employees", href: "/employees", icon: "👥" },
  { name: "Departments", href: "/departments", icon: "🏢" },
  { name: "Leaves", href: "/leaves", icon: "📅" },
  { name: "Attendance", href: "/attendance", icon: "🕒" },
  { name: "Payroll", href: "/payroll", icon: "💰" },
  { name: "Settings", href: "/settings", icon: "⚙️" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [adminName, setAdminName] = useState("Mujeeb"); // Default name

  // 2. Login se naam uthane ka logic
  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail");
    if (savedEmail) {
      const name = savedEmail.split('@')[0];
      setAdminName(name.charAt(0).toUpperCase() + name.slice(1));
    }
  }, []);

  const handleLogout = () => {
    if (confirm("Logout karna chahte hain?")) {
      localStorage.removeItem("isLoggedIn");
      window.location.href = "/login";
    }
  };

  return (
    <div className="w-80 h-screen bg-white border-r border-gray-100 p-8 flex flex-col sticky top-0 shrink-0 z-50">
      <div className="mb-12 px-4">
        <h1 className="text-2xl font-black text-[#7C3AED] tracking-tighter uppercase italic">Pulse<span className="text-gray-900">HR</span></h1>
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${
                isActive 
                ? "bg-purple-50 text-[#7C3AED] shadow-sm" 
                : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-4 pt-6 border-t border-gray-50">
        {/* --- PROFILE SECTION ADDED HERE --- */}
        <div className="p-5 bg-gray-50 rounded-[2.5rem] border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#7C3AED] text-white flex items-center justify-center font-black text-xl shadow-lg shadow-purple-200 shrink-0">
            {adminName[0]} {/* Naam ka pehla letter */}
          </div>
          <div className="overflow-hidden">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Administrator</p>
            <p className="font-black text-gray-800 tracking-tight text-sm truncate">{adminName}</p>
          </div>
        </div>
        
        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 p-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] text-red-500 bg-red-50 hover:bg-red-500 hover:text-white transition-all active:scale-95 shadow-sm"
        >
          Logout Session ➡️
        </button>
      </div>
    </div>
  );
}