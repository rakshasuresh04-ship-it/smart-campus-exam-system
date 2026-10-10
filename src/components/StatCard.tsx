import { CreditCard, FileText, MessageSquareText, Trophy, UserRoundCheck } from 'lucide-react';

export function StatCard({
  label,
  value,
  change,
  icon: Icon,
}: {
  label: string;
  value: string;
  change: string;
  icon: typeof CreditCard;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <h3 className="mt-3 text-3xl font-bold text-slate-900">{value}</h3>
        </div>
        <div className="rounded-xl bg-sky-50 p-3 text-sky-700">
          <Icon className="h-6 w-6" />
        </div>
      </div>
      <p className="mt-4 text-sm font-medium text-emerald-600">{change}</p>
    </div>
  );
}

export function TableCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600">
          <FileText className="h-4 w-4" />
          Export
        </button>
      </div>
      {children}
    </div>
  );
}

export function StatusPill({ value, tone = 'blue' }: { value: string; tone?: 'blue' | 'green' | 'amber' | 'red' }) {
  const tones = {
    blue: 'bg-sky-50 text-sky-700',
    green: 'bg-emerald-50 text-emerald-700',
    amber: 'bg-amber-50 text-amber-700',
    red: 'bg-rose-50 text-rose-700',
  };

  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${tones[tone]}`}>{value}</span>;
}

export function Toolbar({ children }: { children: React.ReactNode }) {
  return <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">{children}</div>;
}

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex min-h-48 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
      <MessageSquareText className="mb-4 h-8 w-8 text-slate-400" />
      <h4 className="text-lg font-semibold text-slate-900">{title}</h4>
      <p className="mt-2 max-w-md text-sm text-slate-500">{description}</p>
    </div>
  );
}

export function LoadingState() {
  return (
    <div className="flex min-h-64 items-center justify-center rounded-2xl border border-slate-200 bg-white">
      <div className="flex items-center gap-3 text-slate-600">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-sky-600"></div>
        Loading data...
      </div>
    </div>
  );
}

export function ScoreBadge({ value }: { value: number }) {
  const tone = value >= 70 ? 'green' : value >= 50 ? 'amber' : 'red';
  return <StatusPill value={`${value}%`} tone={tone} />;
}

export function HeaderAction({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-6">
      <p className="text-xs uppercase tracking-[0.2em] text-sky-600">Overview</p>
      <div className="mt-2 flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">
          <Trophy className="h-3.5 w-3.5" />
          {description}
        </div>
      </div>
    </div>
  );
}

export function UserAvatar({ name }: { name: string }) {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 font-semibold text-sky-700">
      {name
        .split(' ')
        .map(part => part[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()}
    </div>
  );
}
