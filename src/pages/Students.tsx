import { BookOpenText, Building2, GraduationCap, Layers3 } from 'lucide-react';
import { sampleData } from '../lib/sample-data';

export function Academic() {
  const { academic } = sampleData;

  return (
    <div>
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.2em] text-sky-600">Academic Management</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Departments & Curricula</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm text-slate-500">Departments</h3>
            <Building2 className="h-5 w-5 text-sky-600" />
          </div>
          <p className="mt-4 text-3xl font-bold text-slate-900">{academic.departments.length}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm text-slate-500">Courses</h3>
            <GraduationCap className="h-5 w-5 text-sky-600" />
          </div>
          <p className="mt-4 text-3xl font-bold text-slate-900">{academic.courses.length}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm text-slate-500">Subjects</h3>
            <BookOpenText className="h-5 w-5 text-sky-600" />
          </div>
          <p className="mt-4 text-3xl font-bold text-slate-900">{academic.subjects.length}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm text-slate-500">Semesters</h3>
            <Layers3 className="h-5 w-5 text-sky-600" />
          </div>
          <p className="mt-4 text-3xl font-bold text-slate-900">{academic.semesters.length}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Departments</h3>
          <div className="mt-4 space-y-3">
            {academic.departments.map(dept => (
              <div key={dept.id} className="flex items-center justify-between rounded-xl border border-slate-200 p-3">
                <div>
                  <p className="font-semibold text-slate-800">{dept.name}</p>
                  <p className="text-xs text-slate-500">Code: {dept.code}</p>
                </div>
                <span className="rounded-full bg-sky-50 px-2.5 py-1 text-xs font-medium text-sky-700">{dept.hod}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Subject Matrix</h3>
          <div className="mt-4 space-y-3">
            {academic.subjects.map(subject => (
              <div key={subject.id} className="flex items-center justify-between rounded-xl border border-slate-200 p-3">
                <div>
                  <p className="font-semibold text-slate-800">{subject.name}</p>
                  <p className="text-xs text-slate-500">{subject.code} · {subject.credits} credits</p>
                </div>
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">{subject.department}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
