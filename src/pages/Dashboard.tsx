import { BarChart3, BellRing, BookOpenText, CheckCheck, Clock3, GraduationCap, ShieldCheck, Users } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { sampleData } from '../lib/sample-data';
import { StatCard } from '../components/Layout';

const barData = [
  { name: 'CS', students: 420 },
  { name: 'ECE', students: 365 },
  { name: 'MECH', students: 310 },
  { name: 'MBA', students: 220 },
  { name: 'LAW', students: 180 },
];

const pieData = [
  { name: 'Published', value: 18 },
  { name: 'Upcoming', value: 10 },
  { name: 'Completed', value: 6 },
  { name: 'Draft', value: 4 },
];

const COLORS = ['#0ea5e9', '#38bdf8', '#94a3b8', '#dbeafe'];

export function Dashboard() {
  const { stats, recentActivities } = sampleData;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-sky-600">Operations Overview</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Academic Dashboard</h1>
        </div>
        <button className="rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-600/20">
          Generate report
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Students" value={stats.students.toString()} change="+12.4% vs last term" icon={Users} />
        <StatCard label="Faculty Members" value={stats.faculty.toString()} change="+4.7% this semester" icon={ShieldCheck} />
        <StatCard label="Subjects" value={stats.subjects.toString()} change="+8 new courses" icon={BookOpenText} />
        <StatCard label="Examinations" value={stats.exams.toString()} change="3 due this week" icon={Clock3} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Examination Trend</h3>
            <span className="text-sm text-slate-500">This academic year</span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sampleData.trendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="exams" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Exam Status</h3>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={2}>
                  {pieData.map((entry, index) => (
                    <Cell key={`${entry.name}-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Department-wise Student Statistics</h3>
          <div className="mt-5 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="students" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Recent System Activities</h3>
          <div className="mt-5 space-y-3">
            {recentActivities.map(activity => (
              <div key={activity.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <div className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-sky-500"></span>
                  <div>
                    <p className="font-medium text-slate-800">{activity.title}</p>
                    <p className="mt-1 text-sm text-slate-500">{activity.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
