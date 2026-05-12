"use client";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", designation: "" });

  // 1. Announcements State (Static for now, can be fetched from DB later)
  const [announcements] = useState([
    { id: 1, title: "Eid Holiday", date: "May 12", color: "bg-purple-100 text-purple-700" },
    { id: 2, title: "New Policy Update", date: "May 15", color: "bg-blue-100 text-blue-700" },
  ]);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch("/api/employees");
      const dashboardData = await response.json();
      if (!response.ok) throw new Error(dashboardData.error || "Failed to fetch");
      setData(dashboardData);
    } catch (err) {
      console.error("Fetch failed:", err);
      toast.error("Could not load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      const res = await fetch(`/api/employees?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Member removed 🗑️");
        fetchDashboardStats(); 
      }
    } catch (error) { toast.error("Network error!"); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch("/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success("Staff Registered! 🎉");
        setShowModal(false);
        setFormData({ name: "", email: "", designation: "" });
        fetchDashboardStats();
      }
    } catch (error) { toast.error("DB Error"); } finally { setIsSaving(false); }
  };

  const employeesList = data?.employees || [];
  const filteredEmployees = employeesList.filter((emp: any) =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.designation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#7C3AED] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="font-black text-[#7C3AED] text-xl">Syncing PulseHR...</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      <Toaster position="top-right" />
      
      {/* TOP BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">Pulse<span className="text-[#7C3AED]">HR</span></h1>
          <p className="text-gray-500 font-medium italic">Active Session: {new Date().toDateString()}</p>
        </div>
        
        <div className="relative group">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40 text-xl">🔍</span>
          <input 
            type="text"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 pr-6 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm outline-none focus:ring-4 focus:ring-[#7C3AED]/10 w-full md:w-96 font-bold text-sm transition-all"
          />
        </div>
      </div>

      {/* HERO BANNER - Dynamic Member Count */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#4338ca] p-12 rounded-[3.5rem] text-white shadow-2xl">
        <div className="relative z-10">
          <h1 className="text-5xl font-black tracking-tighter mb-4">Welcome back, Mujeeb</h1>
          <p className="text-lg font-medium text-indigo-100 opacity-90">
            <span className="bg-white/10 px-4 py-1.5 rounded-full font-bold text-white mr-2">
              {employeesList.length} Members
            </span> 
            currently registered in your system.
          </p>
          <button onClick={() => setShowModal(true)} className="mt-8 bg-white text-[#1e1b4b] px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl active:scale-95">
            + New Registration
          </button>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 translate-x-20"></div>
      </div>

      {/* STATS GRID - Dynamic Data */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Strength", val: employeesList.length, icon: "👥", color: "bg-blue-50 text-blue-600" },
          { label: "On Leave", val: "2", icon: "🚪", color: "bg-rose-50 text-rose-600" },
          { label: "This Month", val: data?.thisMonthHiredEmployeesCount || "0", icon: "✨", color: "bg-emerald-50 text-emerald-600" },
          { label: "Today Present", val: employeesList.length - 2, icon: "✅", color: "bg-indigo-50 text-indigo-600" },
        ].map((s, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <div className="flex items-center gap-5">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${s.color}`}>{s.icon}</div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{s.label}</p>
                <h3 className="text-2xl font-black text-gray-900">{s.val}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        {/* TABLE SECTION */}
        <div className="xl:col-span-2 bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
            <h3 className="text-xl font-black text-gray-800 uppercase tracking-tighter">Recent Employees</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  <th className="px-10 py-5">Profile</th>
                  <th className="px-10 py-5">Role</th>
                  <th className="px-10 py-5">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredEmployees.slice(0, 5).map((emp: any, idx: number) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-all group">
                    <td className="px-10 py-5 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#7C3AED] flex items-center justify-center font-black">{emp.name[0]}</div>
                      <div>
                        <p className="font-bold text-gray-800 text-sm">{emp.name}</p>
                        <p className="text-[10px] text-gray-400 font-medium">{emp.email}</p>
                      </div>
                    </td>
                    <td className="px-10 py-5 text-xs font-bold text-gray-500 uppercase italic">{emp.designation}</td>
                    <td className="px-10 py-5">
                      <button onClick={() => handleDelete(emp.id)} className="text-red-300 hover:text-red-500 transition-colors text-lg">🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SIDEBAR TOOLS: ANNOUNCEMENTS & PAYROLL PREVIEW */}
        <div className="space-y-8">
          {/* Announcement Card */}
          <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm">
            <h3 className="text-lg font-black text-gray-900 uppercase tracking-tighter mb-6 flex items-center gap-2">
              📢 Announcements
            </h3>
            <div className="space-y-4">
              {announcements.map((item) => (
                <div key={item.id} className={`${item.color} p-5 rounded-2xl`}>
                  <p className="font-black text-sm mb-1">{item.title}</p>
                  <p className="text-[10px] font-bold opacity-70 uppercase">{item.date} • Admin</p>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-4 rounded-2xl border-2 border-dashed border-gray-200 text-gray-400 font-black text-[10px] uppercase tracking-widest hover:bg-gray-50 transition-all">
              + Post New Notice
            </button>
          </div>

          {/* Payroll Quick Link */}
          <div className="bg-[#1e1b4b] p-8 rounded-[3rem] text-white shadow-xl">
            <h3 className="text-lg font-black mb-2 tracking-tighter">Payroll System</h3>
            <p className="text-indigo-200 text-xs font-medium mb-6 leading-relaxed">Generate monthly salary slips for all {employeesList.length} employees.</p>
            <button className="w-full bg-[#7C3AED] text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg hover:bg-purple-500 transition-all">
              Generate Payroll
            </button>
          </div>
        </div>
      </div>

      {/* MODAL CODE REMAINS THE SAME (Isay aapne tabdeel nahi karna) */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/80 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-[3rem] p-10 shadow-2xl animate-in slide-in-from-bottom-10">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black text-gray-900 tracking-tighter uppercase italic">Register <span className="text-[#7C3AED]">Member</span></h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-red-500 font-black">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input required value={formData.name} onChange={(e)=>setFormData({...formData, name: e.target.value})} type="text" className="w-full p-4 bg-gray-50 rounded-xl outline-none font-bold text-sm" placeholder="Display Name" />
                <input required value={formData.email} onChange={(e)=>setFormData({...formData, email: e.target.value})} type="email" className="w-full p-4 bg-gray-50 rounded-xl outline-none font-bold text-sm" placeholder="Email" />
                <input required value={formData.designation} onChange={(e)=>setFormData({...formData, designation: e.target.value})} type="text" className="w-full p-4 bg-gray-50 rounded-xl outline-none font-bold text-sm" placeholder="Designation" />
                <button disabled={isSaving} type="submit" className="w-full bg-gray-900 text-white p-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#7C3AED]">
                   {isSaving ? "SYNCING..." : "CONFIRM REGISTRATION"}
                </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}