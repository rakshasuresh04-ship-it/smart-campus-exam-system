import { AlertTriangle, CalendarDays } from 'lucide-react';
import { useMemo, useState } from 'react';
import { sampleData } from '../lib/sample-data';

export function Timetable() {
  const [department, setDepartment] = useState('All');

  const filtered = useMemo(() => {
    return department === 'All'
      ? sampleData.timetable
      : sampleData.timetable.filter(item => item.course.includes(department));
  }, [department]);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-sky-600">Academic Planning</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Examination Timetable</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-medium text-white">Calendar View</button>
          <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700">Table View</button>
          <select
            value={department}
            onChange={event => setDepartment(event.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none"
          >
            <option value="All">All Departments</option>
            <option value="CSE">Computer Science</option>
            <option value="ECE">Electronics</option>
          </select>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
          <AlertTriangle className="h-4 w-4" />
          {sampleData.timetable.filter(item => item.conflict).length} conflict warnings identified for overlapping student registrations.
        </div>

        <div className="grid gap-4 md:grid-cols-3 mb-5">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Visible schedules</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{filtered.length}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Department filters</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">3</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Calendar entries</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">12</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-slate-500">
              <tr className="border-b border-slate-200">
                <th className="py-3 font-medium">Date</th>
                <th className="py-3 font-medium">Course</th>
                <th className="py-3 font-medium">Subject</th>
                <th className="py-3 font-medium">Hall</th>
                <th className="py-3 font-medium">Time</th>
                <th className="py-3 font-medium">Conflict</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => (
                <tr key={item.id} className="border-b border-slate-100 last:border-0">
                  <td className="py-3 text-slate-700">{item.date}</td>
                  <td className="py-3 text-slate-700">{item.course}</td>
                  <td className="py-3 text-slate-700">{item.subject}</td>
                  <td className="py-3 text-slate-700">{item.hall}</td>
                  <td className="py-3 text-slate-700">{item.time}</td>
                  <td className="py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${item.conflict ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'}`}>
                      {item.conflict ? 'Warning' : 'Clear'}
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
