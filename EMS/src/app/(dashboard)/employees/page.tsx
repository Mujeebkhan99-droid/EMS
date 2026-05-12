"use client";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/employees");
      const data = await res.json();
      
      // Professional check: data.employees exist karta hai ya nahi
      if (res.ok) {
        setEmployees(data.employees || []);
      } else {
        throw new Error(data.error || "Failed to load");
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      toast.error("Database se rabta nahi ho saka!");
    } finally {
      setLoading(false);
    }
  };

  const deleteEmployee = async (id: string) => {
    if (!confirm("Are you sure? This action cannot be undone.")) return;
    
    try {
      // Fixed URL for your single route.ts setup
      const res = await fetch(`/api/employees?id=${id}`, { method: "DELETE" });
      
      if (res.ok) {
        toast.success("Member removed from directory");
        fetchEmployees(); // List refresh
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || "Delete failed");
      }
    } catch (err) {
      toast.error("Network error. Please try again.");
    }
  };

  const filtered = employees.filter(e => 
    e.name.toLowerCase().includes(search.toLowerCase()) || 
    e.designation.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <Toaster position="top-right" />
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">Team <span className="text-[#7C3AED]">Directory</span></h1>
          <p className="text-gray-500 font-medium">Viewing {filtered.length} active employees</p>
        </div>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30">🔍</span>
          <input 
            type="text" 
            placeholder="Search by name or role..." 
            className="bg-white border border-gray-200 pl-12 pr-6 py-4 rounded-2xl shadow-sm outline-none focus:ring-4 focus:ring-[#7C3AED]/10 w-full md:w-96 font-bold text-sm transition-all"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Employees Table */}
      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-100/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Full Name</th>
                <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Contact Information</th>
                <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Position</th>
                <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Management</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan={4} className="p-32 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-12 h-12 border-4 border-[#7C3AED] border-t-transparent rounded-full animate-spin"></div>
                      <p className="font-black text-gray-300 uppercase tracking-widest text-xs">Syncing Directory...</p>
                    </div>
                  </td>
                </tr>
              ) : filtered.length > 0 ? (
                filtered.map((emp) => (
                  <tr key={emp.id} className="hover:bg-indigo-50/20 transition-all group">
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#4338ca] text-white flex items-center justify-center font-black text-lg shadow-lg shadow-purple-100">
                          {emp.name[0]}
                        </div>
                        <p className="font-black text-gray-800 tracking-tight">{emp.name}</p>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <p className="text-sm font-bold text-gray-500">{emp.email}</p>
                    </td>
                    <td className="px-10 py-6">
                      <span className="text-[11px] font-black text-[#7C3AED] bg-[#7C3AED]/10 px-4 py-2 rounded-xl uppercase tracking-tighter">
                        {emp.designation}
                      </span>
                    </td>
                    <td className="px-10 py-6 text-right">
                      <button 
                        onClick={() => deleteEmployee(emp.id)}
                        className="bg-white border border-red-100 text-red-500 hover:bg-red-500 hover:text-white px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase transition-all shadow-sm hover:shadow-red-200"
                      >
                        Terminate
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-24 text-center">
                    <div className="opacity-20 grayscale mb-4 text-5xl">📁</div>
                    <p className="text-gray-400 font-black uppercase tracking-widest text-sm">No Matching Records Found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}