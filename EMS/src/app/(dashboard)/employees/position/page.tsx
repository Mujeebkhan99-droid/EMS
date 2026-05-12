export default function PositionPage() {
  const positions = [
    { title: "Full Stack Developer", dept: "Development", open: 2, filled: 5 },
    { title: "UI/UX Designer", dept: "Design", open: 1, filled: 3 },
    { title: "HR Manager", dept: "Administration", open: 0, filled: 1 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Company Positions</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {positions.map((p) => (
          <div key={p.title} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase">{p.dept}</span>
              <span className="text-gray-300">🏢</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">{p.title}</h3>
            <div className="flex justify-between text-sm border-t pt-4">
              <span className="text-gray-400 font-medium">Vacancies: <b className="text-orange-500">{p.open}</b></span>
              <span className="text-gray-400 font-medium">Filled: <b className="text-green-600">{p.filled}</b></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}