import { CalendarRange, Clock3, Plus, ShieldAlert } from 'lucide-react';
import { sampleData } from '../lib/sample-data';

export function Examinations() {
  const { exams } = sampleData;

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-sky-600">Management</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Examinations</h1>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white">
          <Plus className="h-4 w-4" />
          Create Examination
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {exams.map(exam => (
          <div key={exam.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-sky-600">{exam.type}</p>
                <h3 className="mt-1 text-xl font-semibold text-slate-900">{exam.name}</h3>
              </div>
              <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${exam.status === 'published' ? 'bg-emerald-50 text-emerald-700' : exam.status === 'completed' ? 'bg-slate-200 text-slate-700' : 'bg-amber-50 text-amber-700'}`}>
                {exam.status}
              </span>
            </div>

            <div className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
              <div className="flex items-center gap-2"><CalendarRange className="h-4 w-4 text-sky-600" /> {exam.date}</div>
              <div className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-sky-600" /> {exam.startTime} - {exam.endTime}</div>
              <div>{exam.department}</div>
              <div>{exam.semester}</div>
              <div>{exam.subject}</div>
              <div>{exam.duration} mins</div>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <button className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700">Edit</button>
              <button className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">Cancel</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
