"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock Login Logic (Jab tak DB nahi hai)
    if (email === "admin@pulsehr.com" && password === "admin123") {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);
      toast.success("Welcome back, Mujeeb! 🚀");
      
      setTimeout(() => {
        router.push("/"); // Dashboard par bhej dena
      }, 1500);
    } else {
      toast.error("Ghalat Email ya Password! (Try: admin@pulsehr.com / admin123)");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <Toaster position="top-center" />
      <div className="w-full max-w-md bg-white rounded-[3.5rem] p-12 shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-500">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">Pulse<span className="text-[#7C3AED]">HR</span></h1>
          <p className="text-gray-400 font-bold text-xs mt-2 uppercase tracking-widest">Sign in to your workspace</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Email Address</label>
            <input 
              required 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#7C3AED]/10 outline-none font-bold text-gray-700 transition-all" 
              placeholder="admin@pulsehr.com" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Secret Password</label>
            <input 
              required 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#7C3AED]/10 outline-none font-bold text-gray-700 transition-all" 
              placeholder="••••••••" 
            />
          </div>

          <button type="submit" className="w-full bg-[#1e1b4b] text-white p-5 rounded-2xl font-black shadow-xl hover:bg-[#7C3AED] transition-all active:scale-95">
            ACCESS DASHBOARD
          </button>
        </form>

        <p className="text-center mt-8 text-gray-400 text-xs font-bold uppercase tracking-widest">
          No account? <span className="text-[#7C3AED] cursor-pointer hover:underline">Contact Admin</span>
        </p>
      </div>
    </div>
  );
}