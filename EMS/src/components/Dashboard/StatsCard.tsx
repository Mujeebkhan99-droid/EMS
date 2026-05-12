interface StatsCardProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
  color: string;
}

export default function StatsCard({ label, value, color }: StatsCardProps) {
  return (
    <div className={`bg-white p-6 rounded-2xl shadow-sm border-l-4 ${color} transition-transform hover:scale-105`}>
      <p className="text-gray-400 text-xs font-black uppercase tracking-widest">{label}</p>
      <h3 className="text-3xl font-bold text-slate-800 mt-2">{value}</h3>
    </div>
  );
}