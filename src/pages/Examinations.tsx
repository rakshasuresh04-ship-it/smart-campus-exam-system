import { Download, Filter, MoreHorizontal, Plus, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { sampleData } from '../lib/sample-data';

export function Faculty() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');

  const filtered = useMemo(() => {
    return sampleData.faculty.filter(member => {
      const matchesQuery =
        member.name.toLowerCase().includes(query.toLowerCase()) ||
        member.facultyId.toLowerCase().includes(query.toLowerCase()) ||
        member.department.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = status === 'all' || member.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [query, status]);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-sky-600">Faculty Management</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Faculty</h1>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white">
          <Plus className="h-4 w-4" />
          Add Faculty
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={event => setQuery(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-sky-400"
              placeholder="Search faculty"
            />
          </div>
          <div className="flex items-center gap-3">
            <select
              value={status}
              onChange={event => setStatus(event.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none"
            >
              <option value="all">All status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600">
              <Filter className="h-4 w-4" />
              Filter
            </button>
            <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600">
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-slate-500">
              <tr className="border-b border-slate-200">
                <th className="py-3 font-medium">Faculty</th>
                <th className="py-3 font-medium">Department</th>
                <th className="py-3 font-medium">Designation</th>
                <th className="py-3 font-medium">Assigned Subjects</th>
                <th className="py-3 font-medium">Status</th>
                <th className="py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(member => (
                <tr key={member.id} className="border-b border-slate-100 last:border-0">
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-xs font-semibold text-amber-700">
                        {member.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{member.name}</p>
                        <p className="text-xs text-slate-500">{member.facultyId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 text-slate-600">{member.department}</td>
                  <td className="py-3 text-slate-600">{member.designation}</td>
                  <td className="py-3 text-slate-600">{member.assignedSubjects ?? '5 courses'}</td>
                  <td className="py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${member.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <button className="rounded-lg border border-slate-200 p-2 text-slate-600">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
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
