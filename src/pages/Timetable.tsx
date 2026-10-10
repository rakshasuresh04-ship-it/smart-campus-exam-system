import { AlertTriangle, CalendarDays, School, TableProperties } from 'lucide-react';
import { sampleData } from '../lib/sample-data';

export function Timetable() {
  const { timetable } = sampleData;

  return (
    <div>
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.2em] text-sky-600">Academic Planning</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Examination Timetable</h1>
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        <button className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-medium text-white">Calendar View</button>
        <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700">Table View</button>
        <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700">Department Filter</button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
          <AlertTriangle className="h-4 w-4" />
          2 conflict warnings identified for overlapping student registrations.
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
              {timetable.map(item => (
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
