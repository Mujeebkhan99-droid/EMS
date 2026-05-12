"use client";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function AttendancePage() {
  const [time, setTime] = useState("");
  const [status, setStatus] = useState("Absent");
  const [mounted, setMounted] = useState(false);
  
  // Dummy Data
  const [history, setHistory] = useState([
    { id: 1, name: "Ali Khan", time: "09:00 AM", status: "Present" },
    { id: 2, name: "Hamza Sheikh", time: "-", status: "Absent" },
  ]);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handlePunchIn = () => {
    const now = new Date();
    const currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Professional Logic: 09:15 AM ke baad 'Late' mark hoga
    const isLate = now.getHours() > 9 || (now.getHours() === 9 && now.getMinutes() > 15);
    const currentStatus = isLate ? "Late" : "Present";

    const newEntry = {
      id: history.length + 1,
      name: "Mujeeb (You)",
      time: currentTime,
      status: currentStatus
    };

    setHistory([newEntry, ...history]);
    setStatus("Present");
    
    if(isLate) {
        toast.error(`Late Entry marked at ${currentTime} ⚠️`);
    } else {
        toast.success(`Attendance Marked at ${currentTime}! 🎉`);
    }
  };

  if (!mounted) return null;

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <Toaster position="top-right" />

      {/* HEADER SECTION */}
      <div className="px-2">
        <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">Attendance <span className="text-[#7C3AED]">Portal</span></h1>
        <p className="text-gray-500 font-medium">Daily check-in and activity logs</p>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm group hover:border-[#7C3AED] transition-all">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Members</p>
          <h3 className="text-3xl font-black text-gray-900">{history.length}</h3>
        </div>
        <div className="bg-emerald-50 p-8 rounded-[2.5rem] border border-emerald-100 shadow-sm">
          <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Present Today</p>
          <h3 className="text-3xl font-black text-emerald-700">{history.filter(h => h.status !== "Absent").length}</h3>
        </div>
        <div className="bg-rose-50 p-8 rounded-[2.5rem] border border-rose-100 shadow-sm">
          <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest mb-1">Absent</p>
          <h3 className="text-3xl font-black text-rose-700">{history.filter(h => h.status === "Absent").length}</h3>
        </div>
      </div>

      {/* MAIN CLOCK WIDGET */}
      <div className="max-w-2xl mx-auto bg-[#1e1b4b] p-16 rounded-[4rem] shadow-2xl text-center relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-20 translate-x-20 blur-3xl group-hover:bg-purple-500/10 transition-all duration-1000"></div>
        
        <p className="text-indigo-300 font-black uppercase text-[11px] tracking-[0.4em] mb-6">Real-time System Clock</p>
        <h2 className="text-8xl font-black text-white mb-12 font-mono tracking-tighter drop-shadow-2xl">{time}</h2>
        
        <div className={`w-28 h-28 rounded-[2.5rem] mx-auto mb-10 flex items-center justify-center text-5xl transition-all duration-1000 ${status === "Present" ? "bg-emerald-500 rotate-[360deg] shadow-[0_0_50px_rgba(16,185,129,0.4)]" : "bg-white/10"}`}>
          {status === "Present" ? "✅" : "🕒"}
        </div>

        <button 
          onClick={handlePunchIn}
          disabled={status === "Present"}
          className={`w-full py-7 rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] transition-all duration-500 ${status === "Present" ? "bg-emerald-500/20 text-emerald-400 cursor-not-allowed border border-emerald-500/30" : "bg-white text-[#1e1b4b] shadow-2xl hover:scale-[1.02] active:scale-95 hover:bg-yellow-300"}`}
        >
          {status === "Present" ? "Session Logged Successfully" : "Confirm My Punch In"}
        </button>
      </div>

      {/* TODAY'S LOGS TABLE */}
      <div className="bg-white rounded-[3.5rem] border border-gray-100 shadow-xl overflow-hidden">
        <div className="p-10 border-b border-gray-50 flex justify-between items-center bg-gray-50/20">
          <div>
            <h3 className="text-2xl font-black text-gray-800 tracking-tight uppercase italic">Live Attendance Feed</h3>
          </div>
          <span className="bg-[#7C3AED] px-6 py-3 rounded-2xl text-[11px] font-black text-white uppercase tracking-widest shadow-lg shadow-purple-200">
            {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                <th className="px-12 py-8">Staff Member</th>
                <th className="px-12 py-8">Check-in Time</th>
                <th className="px-12 py-8 text-center">Status Badge</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm font-bold">
              {history.map((log) => (
                <tr key={log.id} className="hover:bg-indigo-50/20 transition-all group">
                  <td className="px-12 py-7 flex items-center gap-5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black transition-all ${log.status !== "Absent" ? "bg-[#7C3AED] text-white" : "bg-gray-100 text-gray-400"}`}>
                      {log.name[0]}
                    </div>
                    <p className="text-gray-800 tracking-tight">{log.name}</p>
                  </td>
                  <td className="px-12 py-7 text-gray-400 font-mono italic">{log.time}</td>
                  <td className="px-12 py-7 text-center">
                    <span className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                        log.status === "Present" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : 
                        log.status === "Late" ? "bg-amber-50 text-amber-600 border-amber-100" : 
                        "bg-rose-50 text-rose-600 border-rose-100"
                    }`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}