import { MapPinned, Plus, UserRoundCheck } from 'lucide-react';
import { sampleData } from '../lib/sample-data';

export function HallAllocation() {
  const { halls, seatAllocations } = sampleData;

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-sky-600">Smart Hall Management</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Hall Allocation</h1>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white">
          <Plus className="h-4 w-4" />
          Auto Allocate
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Room Inventory</h3>
          <div className="mt-4 space-y-3">
            {halls.map(hall => (
              <div key={hall.id} className="flex items-center justify-between rounded-xl border border-slate-200 p-3">
                <div>
                  <p className="font-medium text-slate-800">{hall.name}</p>
                  <p className="text-xs text-slate-500">{hall.building} · {hall.capacity} seats</p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${hall.available ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                  {hall.available ? 'Available' : 'Booked'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Seat Allocation Summary</h3>
          <div className="mt-4 space-y-3">
            {seatAllocations.map(item => (
              <div key={item.id} className="flex items-center justify-between rounded-xl border border-slate-200 p-3">
                <div>
                  <p className="font-medium text-slate-800">{item.student}</p>
                  <p className="text-xs text-slate-500">{item.hall} · Seat {item.seat}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-sky-50 px-2.5 py-1 text-xs font-medium text-sky-700">{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
