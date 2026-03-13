import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth, UserRole } from "../context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Anchor, Ship, BarChart3, Settings, ChevronRight, Shield } from "lucide-react";

const roles = [
  {
    id: 'operator' as UserRole,
    title: 'Operator',
    icon: Ship,
    description: 'Access live vessel tracking, port operations, and real-time alerts',
    color: 'from-blue-600 to-blue-700',
    features: ['Live vessel monitoring', 'Port arrivals & departures', 'Real-time alerts', 'Interactive map view']
  },
  {
    id: 'analyst' as UserRole,
    title: 'Analyst',
    icon: BarChart3,
    description: 'View analytics, performance metrics, and statistical insights',
    color: 'from-cyan-600 to-cyan-700',
    features: ['Voyage analytics', 'Traffic trends', 'Performance metrics', 'Risk analysis']
  },
  {
    id: 'admin' as UserRole,
    title: 'Admin',
    icon: Settings,
    description: 'Manage system settings, monitor APIs, and export data',
    color: 'from-purple-600 to-purple-700',
    features: ['System monitoring', 'API status tracking', 'Log viewer', 'Data export tools']
  }
];

export default function Login() {
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (selectedRole) {
      login(selectedRole);
      
      // Navigate based on role
      switch (selectedRole) {
        case 'operator':
          navigate('/operator');
          break;
        case 'analyst':
          navigate('/analyst');
          break;
        case 'admin':
          navigate('/admin');
          break;
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-blue-600 p-3 rounded-xl shadow-lg">
              <Anchor className="w-10 h-10 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-bold text-white">Maritime Platform</h1>
              <p className="text-blue-200">Vessel Tracking & Port Analytics</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 mt-6">
            <Shield className="w-5 h-5 text-blue-300" />
            <p className="text-blue-100 text-lg">Select Your Role to Access Dashboard</p>
          </div>
        </div>

        {/* Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {roles.map((role) => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.id;
            
            return (
              <Card
                key={role.id}
                className={`cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  isSelected 
                    ? 'ring-4 ring-white shadow-2xl scale-105' 
                    : 'hover:shadow-xl'
                }`}
                onClick={() => setSelectedRole(role.id)}
              >
                <CardHeader className={`bg-gradient-to-br ${role.color} text-white pb-4`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-white/20 p-2 rounded-lg">
                        <Icon className="w-6 h-6" />
                      </div>
                      <CardTitle className="text-xl">{role.title}</CardTitle>
                    </div>
                    {isSelected && (
                      <div className="bg-white text-blue-600 rounded-full p-1">
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-slate-600 text-sm mb-4">{role.description}</p>
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-slate-500 uppercase">Access Includes:</p>
                    {role.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-slate-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Login Button */}
        <div className="text-center">
          <Button
            onClick={handleLogin}
            disabled={!selectedRole}
            className="px-8 py-6 text-lg font-semibold bg-white text-blue-900 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl"
            size="lg"
          >
            {selectedRole ? `Continue as ${roles.find(r => r.id === selectedRole)?.title}` : 'Select a Role to Continue'}
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center">
          <div className="bg-blue-800/30 backdrop-blur-sm rounded-lg p-4 border border-blue-700/50">
            <p className="text-blue-200 text-sm">
              <Shield className="w-4 h-4 inline mr-2" />
              Role-Based Access Control: Each role has restricted access to specific dashboards and features
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
