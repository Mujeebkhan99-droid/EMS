"use client";
import { useState } from "react";

export default function SalariesPage() {
  const [data, setData] = useState([
    { id: 1, name: "Mujeeb Khan", amount: "55,000", status: "Unpaid" },
    { id: 2, name: "Robert Fox", amount: "48,000", status: "Paid" },
  ]);

  const handlePay = (id: number) => {
    setData(data.map(emp => emp.id === id ? { ...emp, status: "Paid" } : emp));
    alert("Payment Dispatched!");
  };

  return (
    <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
      <h2 className="text-2xl font-black text-gray-800 mb-8">Payroll Management</h2>
      <div className="space-y-4">
        {data.map((emp) => (
          <div key={emp.id} className="flex items-center justify-between p-6 bg-gray-50 rounded-[1.5rem] border border-transparent hover:border-purple-200 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm">💰</div>
              <div>
                <p className="font-bold text-gray-800">{emp.name}</p>
                <p className="text-xs text-gray-400 font-mono">Net Payable: PKR {emp.amount}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${emp.status === "Paid" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                {emp.status}
              </span>
              {emp.status === "Unpaid" && (
                <button onClick={() => handlePay(emp.id)} className="bg-[#7C3AED] text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-purple-700">Pay Now</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}