import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function Auth() {
  const { signIn, session, loading } = useAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get('email') ?? '');
    const password = String(form.get('password') ?? '');

    if (!email || !password) return;

    const response = await signIn(email, password);
    if (response.error) {
      console.error(response.error.message);
    }
  };

  if (loading) return <div className="flex min-h-screen items-center justify-center">Loading...</div>;

  if (session) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
        <div className="mb-6 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-sky-600">University Portal</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Smart Campus</h1>
        </div>

        <div className="mb-6 rounded-2xl border border-sky-100 bg-sky-50 p-4 text-sm text-sky-800">
          Configure your Supabase credentials in <span className="font-semibold">.env.local</span> to enable live authentication.
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
            <input name="email" type="email" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-sky-400" placeholder="you@campus.edu" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
            <input name="password" type="password" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-sky-400" placeholder="••••••••" />
          </div>
          <button type="submit" className="w-full rounded-xl bg-sky-600 px-4 py-3 font-semibold text-white shadow-lg shadow-sky-600/20">Sign In</button>
        </form>
      </div>
    </div>
  );
}
