"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo logic: Data save karke login par bhej dena
    localStorage.setItem("userEmail", formData.email);
    alert("Account Created Successfully!");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#F3F4F9] flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md p-10 rounded-[3rem] shadow-xl border border-gray-100">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white font-bold text-2xl">P</div>
          <h1 className="text-3xl font-black text-gray-800 tracking-tighter">Create Account</h1>
          <p className="text-gray-400 mt-2 font-medium">Join PulseHR to manage your team</p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 px-2">Full Name</label>
            <input 
              type="text" 
              required 
              className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 ring-purple-400 font-medium" 
              placeholder="Mujeeb Khan"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 px-2">Email Address</label>
            <input 
              type="email" 
              required 
              className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 ring-purple-400 font-medium" 
              placeholder="admin@pulsehr.com"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 px-2">Password</label>
            <input 
              type="password" 
              required 
              className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 ring-purple-400 font-medium" 
              placeholder="••••••••"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
          
          <button className="w-full bg-purple-600 text-white py-5 rounded-2xl font-black shadow-lg shadow-purple-100 hover:bg-purple-700 transition-all uppercase tracking-widest text-xs mt-4">
            Create Admin Account
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-gray-500 font-medium">
          Already have an account? <Link href="/login" className="text-purple-600 font-black">Sign In</Link>
        </p>
      </div>
    </div>
  );
}