import { NavLink } from "react-router";
import { Ship, BarChart3, Settings, Anchor, LogOut, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export default function Sidebar() {
  const { userRole, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Role-based navigation - users only see their own dashboard
  const getRoleConfig = () => {
    switch (userRole) {
      case 'operator':
        return {
          title: 'Operator',
          route: '/operator',
          icon: Ship,
          color: 'bg-blue-700',
          description: 'Live Operations'
        };
      case 'analyst':
        return {
          title: 'Analyst',
          route: '/analyst',
          icon: BarChart3,
          color: 'bg-cyan-700',
          description: 'Analytics & Insights'
        };
      case 'admin':
        return {
          title: 'Admin',
          route: '/admin',
          icon: Settings,
          color: 'bg-purple-700',
          description: 'System Management'
        };
      default:
        return null;
    }
  };

  const roleConfig = getRoleConfig();

  if (!roleConfig) return null;

  const Icon = roleConfig.icon;

  return (
    <aside className="w-64 bg-gradient-to-b from-blue-900 to-blue-950 text-white shadow-xl flex flex-col">
      {/* Logo Header */}
      <div className="p-6 border-b border-blue-800">
        <div className="flex items-center gap-3">
          <div className="bg-blue-700 p-2 rounded-lg">
            <Anchor className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-semibold text-lg">Maritime</h1>
            <p className="text-xs text-blue-300">Port Analytics</p>
          </div>
        </div>
      </div>

      {/* User Role Badge */}
      <div className="p-4 bg-blue-800/50 border-b border-blue-800">
        <div className="flex items-center gap-2 mb-2">
          <User className="w-4 h-4 text-blue-300" />
          <span className="text-xs text-blue-300 uppercase font-semibold">Current Role</span>
        </div>
        <Badge className={`${roleConfig.color} text-white border-0 w-full justify-center py-1`}>
          {roleConfig.title}
        </Badge>
        <p className="text-xs text-blue-300 mt-2 text-center">{roleConfig.description}</p>
      </div>

      {/* Navigation - Only shows user's dashboard */}
      <nav className="p-4 flex-1">
        <div className="mb-3">
          <p className="text-xs text-blue-400 uppercase font-semibold mb-2">Your Dashboard</p>
        </div>
        <NavLink
          to={roleConfig.route}
          className="flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-600 shadow-lg"
        >
          <Icon className="w-5 h-5" />
          <span className="font-medium">{roleConfig.title} Dashboard</span>
        </NavLink>

        {/* Access Restriction Notice */}
        <div className="mt-6 p-3 bg-blue-800/30 rounded-lg border border-blue-700/50">
          <p className="text-xs text-blue-300 leading-relaxed">
            <span className="font-semibold">Access Restricted:</span> You can only view the {roleConfig.title} dashboard based on your role permissions.
          </p>
        </div>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-blue-800">
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full flex items-center justify-center gap-2 text-white border-blue-700 hover:bg-blue-800"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-blue-800">
        <div className="text-xs text-blue-300">
          <p>Version 2.4.1</p>
          <p className="mt-1">© 2026 Maritime Analytics</p>
        </div>
      </div>
    </aside>
  );
}