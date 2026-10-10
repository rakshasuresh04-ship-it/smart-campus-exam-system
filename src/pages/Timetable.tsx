import { CalendarRange, Clock3, Plus, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { sampleData } from '../lib/sample-data';

export function Examinations() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('all');

  const visibleExams = useMemo(() => {
    return sampleData.exams.filter(exam => {
      const matchesQuery =
        exam.name.toLowerCase().includes(query.toLowerCase()) ||
        exam.subject.toLowerCase().includes(query.toLowerCase()) ||
        exam.department.toLowerCase().includes(query.toLowerCase());
      const matchesType = type === 'all' || exam.type === type;
      return matchesQuery && matchesType;
    });
  }, [query, type]);

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

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Upcoming</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{sampleData.exams.filter(item => item.status === 'draft' || item.status === 'published').length}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Ongoing</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">4</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Completed</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{sampleData.exams.filter(item => item.status === 'completed').length}</p>
        </div>
      </div>

      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={event => setQuery(event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-sky-400"
            placeholder="Search exams"
          />
        </div>
        <select
          value={type}
          onChange={event => setType(event.target.value)}
          className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none"
        >
          <option value="all">All exam types</option>
          <option value="Midterm">Midterm</option>
          <option value="Endterm">Endterm</option>
          <option value="Practical">Practical</option>
        </select>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {visibleExams.map(exam => (
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
