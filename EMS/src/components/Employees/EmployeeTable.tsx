export default function EmployeeTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 text-slate-500 text-[10px] uppercase font-bold border-b">
            <th className="px-6 py-4">Name</th>
            <th className="px-6 py-4">Role</th>
            <th className="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          <tr className="hover:bg-indigo-50/50 transition">
            <td className="px-6 py-4 font-semibold text-slate-700">Ali Khan</td>
            <td className="px-6 py-4 text-slate-500">Project Manager</td>
            <td className="px-6 py-4 text-center">
              <button className="text-indigo-600 font-bold px-2 hover:underline">Edit</button>
              <button className="text-red-500 font-bold px-2 hover:underline">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}