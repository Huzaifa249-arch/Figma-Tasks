import { createBrowserRouter, Navigate } from 'react-router';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Navbar } from './components/Navbar';
import Login from './pages/Login';
import OperatorDashboard from './pages/OperatorDashboard';
import AnalystDashboard from './pages/AnalystDashboard';
import AdminDashboard from './pages/AdminDashboard';
import LiveMap from './pages/LiveMap';
import VoyageReplay from './pages/VoyageReplay';
import Ports from './pages/Ports';
import InsurerDashboard from './pages/InsurerDashboard';
import Profile from './pages/Profile';

// Layout wrapper for protected pages
function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      {children}
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/dashboard/operator',
    element: (
      <ProtectedRoute allowedRoles={['operator']}>
        <ProtectedLayout>
          <OperatorDashboard />
        </ProtectedLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/dashboard/analyst',
    element: (
      <ProtectedRoute allowedRoles={['analyst']}>
        <ProtectedLayout>
          <AnalystDashboard />
        </ProtectedLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/dashboard/admin',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <ProtectedLayout>
          <AdminDashboard />
        </ProtectedLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/live-map',
    element: (
      <ProtectedRoute>
        <ProtectedLayout>
          <LiveMap />
        </ProtectedLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/voyage-replay',
    element: (
      <ProtectedRoute>
        <ProtectedLayout>
          <VoyageReplay />
        </ProtectedLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/ports',
    element: (
      <ProtectedRoute>
        <ProtectedLayout>
          <Ports />
        </ProtectedLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/insurer-dashboard',
    element: (
      <ProtectedRoute>
        <ProtectedLayout>
          <InsurerDashboard />
        </ProtectedLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <ProtectedLayout>
          <Profile />
        </ProtectedLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
]);
