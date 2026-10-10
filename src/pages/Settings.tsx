import { Info, ShieldCheck } from 'lucide-react';

export function Settings() {
  return (
    <div>
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.2em] text-sky-600">Configuration</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">System Settings</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-sky-100 p-2 text-sky-700"><ShieldCheck className="h-5 w-5" /></div>
            <h3 className="text-lg font-semibold text-slate-900">Security Controls</h3>
          </div>
          <ul className="mt-5 space-y-3 text-sm text-slate-600">
            <li>• Role-based access and row-level security enabled</li>
            <li>• Audit logs recorded for admin modifications</li>
            <li>• Auth tokens managed by Supabase</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-emerald-100 p-2 text-emerald-700"><Info className="h-5 w-5" /></div>
            <h3 className="text-lg font-semibold text-slate-900">Environment Status</h3>
          </div>
          <p className="mt-5 text-sm text-slate-600">
            Configure your Supabase project in the <code>.env.local</code> file to activate live auth and data operations.
          </p>
        </div>
      </div>
    </div>
  );
}
