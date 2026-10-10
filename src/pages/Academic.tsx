import { Bell, BookOpen, Building2, CalendarDays, ChartColumn, CreditCard, GraduationCap, LayoutDashboard, LogOut, Menu, ShieldCheck, UserCog, Users } from 'lucide-react';
import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const sidebarItems = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/dashboard' },
  { label: 'Students', icon: Users, to: '/students' },
  { label: 'Faculty', icon: UserCog, to: '/faculty' },
  { label: 'Academic', icon: BookOpen, to: '/academic' },
  { label: 'Departments', icon: Building2, to: '/academic' },
  { label: 'Courses', icon: BookOpen, to: '/academic' },
  { label: 'Subjects', icon: CreditCard, to: '/academic' },
  { label: 'Examinations', icon: CalendarDays, to: '/examinations' },
  { label: 'Timetable', icon: ChartColumn, to: '/timetable' },
  { label: 'Hall Allocation', icon: ShieldCheck, to: '/hall-allocation' },
  { label: 'Invigilation', icon: Bell, to: '/examinations' },
  { label: 'Results', icon: GraduationCap, to: '/results' },
  { label: 'Notifications', icon: Bell, to: '/notifications' },
  { label: 'Settings', icon: UserCog, to: '/settings' },
];

export function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { signOut, userRole } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <div className="flex min-h-screen">
        <aside className={`${mobileOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-30 w-72 border-r border-slate-200 bg-slate-900 text-slate-100 transition-transform duration-200 lg:translate-x-0 lg:static`}>
          <div className="flex items-center justify-between border-b border-slate-700 p-5">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-sky-300">Campus</p>
              <h1 className="text-xl font-semibold">Smart Exam</h1>
            </div>
            <button className="lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Close sidebar">
              <Menu className="h-5 w-5" />
            </button>
          </div>

          <nav className="space-y-2 px-3 py-5">
            {sidebarItems.map(({ label, icon: Icon, to }) => (
              <NavLink
                key={label}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                    isActive ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`
                }
                onClick={() => setMobileOpen(false)}
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="absolute inset-x-4 bottom-4 rounded-xl border border-slate-700 bg-slate-800 p-3">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Role</p>
            <p className="mt-1 text-sm font-semibold capitalize">{userRole ?? 'Guest'}</p>
          </div>
        </aside>

        <div className="flex-1">
          <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center justify-between px-4 py-3 sm:px-6">
              <div className="flex items-center gap-3">
                <button className="rounded-lg border border-slate-200 p-2 lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open sidebar">
                  <Menu className="h-5 w-5" />
                </button>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-sky-600">Academic Dashboard</p>
                  <h2 className="text-lg font-semibold">Smart Campus</h2>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="rounded-full border border-slate-200 bg-white p-2 text-slate-600" aria-label="Notifications">
                  <Bell className="h-4 w-4" />
                </button>
                <button
                  onClick={handleSignOut}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-900 px-3 py-2 text-sm font-medium text-white"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </div>
          </header>

          <main className="p-4 sm:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
