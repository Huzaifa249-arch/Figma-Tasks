import { Link, useLocation } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { Ship, LogOut, User } from 'lucide-react';
import { Button } from './ui/button';

export function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) return null;

  const getDashboardPath = () => {
    if (!user) return '/';
    const dashboardMap = {
      operator: '/dashboard/operator',
      analyst: '/dashboard/analyst',
      admin: '/dashboard/admin',
    };
    return dashboardMap[user.role];
  };

  const navItems = [
    { name: 'Dashboard', path: getDashboardPath() },
    { name: 'Live Map', path: '/live-map' },
    { name: 'Voyage Replay', path: '/voyage-replay' },
    { name: 'Ports', path: '/ports' },
    { name: 'Insurer Dashboard', path: '/insurer-dashboard' },
    { name: 'Profile', path: '/profile' },
  ];

  // Add Admin link only for admin users
  if (user?.role === 'admin') {
    navItems.push({ name: 'Admin', path: '/dashboard/admin' });
  }

  return (
    <nav className="bg-gradient-to-r from-blue-900 via-blue-800 to-cyan-900 border-b border-blue-700 shadow-lg">
      <div className="mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to={getDashboardPath()} className="flex items-center gap-2 text-white hover:text-cyan-300 transition-colors">
              <Ship className="w-8 h-8" />
              <span className="font-semibold text-lg">Maritime Analytics</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm transition-colors ${
                    location.pathname === item.path
                      ? 'bg-blue-700 text-white'
                      : 'text-blue-100 hover:bg-blue-800 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-blue-100">
              <User className="w-4 h-4" />
              <span className="text-sm hidden sm:inline">
                {user?.name} ({user?.role})
              </span>
            </div>
            <Button
              onClick={logout}
              variant="ghost"
              size="sm"
              className="text-blue-100 hover:text-white hover:bg-blue-800"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
