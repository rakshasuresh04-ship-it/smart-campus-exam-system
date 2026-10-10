import { BarChart3, Download, Eye } from 'lucide-react';
import { useMemo, useState } from 'react';
import { sampleData } from '../lib/sample-data';

export function Results() {
  const [status, setStatus] = useState('all');

  const visibleResults = useMemo(() => {
    return status === 'all' ? sampleData.results : sampleData.results.filter(item => item.status === status);
  }, [status]);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-sky-600">Academic Records</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Results</h1>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white">
          <Download className="h-4 w-4" />
          Publish Results
        </button>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Passed</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{sampleData.results.filter(item => item.status === 'pass').length}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Failed</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{sampleData.results.filter(item => item.status === 'fail').length}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Published</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">2</p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold text-slate-900">Performance Summary</h3>
          <div className="flex items-center gap-3">
            <select
              value={status}
              onChange={event => setStatus(event.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none"
            >
              <option value="all">All results</option>
              <option value="pass">Passed</option>
              <option value="fail">Failed</option>
            </select>
            <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-slate-500">
              <tr className="border-b border-slate-200">
                <th className="py-3 font-medium">Exam</th>
                <th className="py-3 font-medium">Student</th>
                <th className="py-3 font-medium">Marks</th>
                <th className="py-3 font-medium">Grade</th>
                <th className="py-3 font-medium">Status</th>
                <th className="py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {visibleResults.map(result => (
                <tr key={result.id} className="border-b border-slate-100 last:border-0">
                  <td className="py-3 text-slate-700">{result.examName}</td>
                  <td className="py-3 text-slate-700">{result.student}</td>
                  <td className="py-3 text-slate-700">{result.marks}/{result.maxMarks}</td>
                  <td className="py-3 text-slate-700">{result.grade}</td>
                  <td className="py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${result.status === 'pass' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                      {result.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-2.5 py-1.5 text-xs text-slate-600">
                      <Eye className="h-3.5 w-3.5" />
                      View
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
