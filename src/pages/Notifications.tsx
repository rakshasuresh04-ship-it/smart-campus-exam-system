import { BellRing, CheckCheck, Info, ShieldAlert } from 'lucide-react';
import { sampleData } from '../lib/sample-data';

export function Notifications() {
  const { notifications } = sampleData;

  return (
    <div>
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.2em] text-sky-600">Communication</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Notifications</h1>
      </div>

      <div className="space-y-4">
        {notifications.map(item => (
          <div key={item.id} className={`rounded-2xl border p-4 shadow-sm ${item.unread ? 'border-sky-200 bg-sky-50' : 'border-slate-200 bg-white'}`}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className={`mt-1 rounded-full p-2 ${item.unread ? 'bg-sky-100 text-sky-700' : 'bg-slate-100 text-slate-600'}`}>
                  {item.unread ? <BellRing className="h-4 w-4" /> : <CheckCheck className="h-4 w-4" />}
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{item.message}</p>
                </div>
              </div>
              <span className="text-xs text-slate-500">{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
