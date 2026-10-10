import { Route, Routes, Navigate } from 'react-router-dom';
import { Auth } from './pages/Auth';
import { Dashboard } from './pages/Dashboard';
import { Students } from './pages/Students';
import { Faculty } from './pages/Faculty';
import { Examinations } from './pages/Examinations';
import { Timetable } from './pages/Timetable';
import { HallAllocation } from './pages/HallAllocation';
import { Results } from './pages/Results';
import { Notifications } from './pages/Notifications';
import { Settings } from './pages/Settings';
import { Layout } from './components/Layout';
import { useAuth } from './contexts/AuthContext';
import { Role } from './types';

const allRoles: Role[] = ['admin', 'faculty', 'student'];

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactElement; allowedRoles: Role[] }) {
  const { session, loading, userRole } = useAuth();

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center text-slate-600">Loading...</div>;
  }

  if (!session || !userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Auth />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute allowedRoles={allRoles}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="students"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Students />
            </ProtectedRoute>
          }
        />
        <Route
          path="faculty"
          element={
            <ProtectedRoute allowedRoles={['admin', 'faculty']}>
              <Faculty />
            </ProtectedRoute>
          }
        />
        <Route
          path="examinations"
          element={
            <ProtectedRoute allowedRoles={['admin', 'faculty', 'student']}>
              <Examinations />
            </ProtectedRoute>
          }
        />
        <Route
          path="timetable"
          element={
            <ProtectedRoute allowedRoles={['admin', 'faculty', 'student']}>
              <Timetable />
            </ProtectedRoute>
          }
        />
        <Route
          path="hall-allocation"
          element={
            <ProtectedRoute allowedRoles={['admin', 'faculty']}>
              <HallAllocation />
            </ProtectedRoute>
          }
        />
        <Route
          path="results"
          element={
            <ProtectedRoute allowedRoles={['admin', 'faculty', 'student']}>
              <Results />
            </ProtectedRoute>
          }
        />
        <Route
          path="notifications"
          element={
            <ProtectedRoute allowedRoles={['admin', 'faculty', 'student']}>
              <Notifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="settings"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Settings />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
