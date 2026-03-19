import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth, UserRole } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Ship, Anchor } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [error, setError] = useState('');
  const [step, setStep] = useState<'credentials' | 'role'>('credentials');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setStep('role');
  };

  const handleRoleSelection = async (role: UserRole) => {
    setSelectedRole(role);
    setError('');

    const success = await login(email, password, role);
    if (success) {
      const dashboardMap = {
        operator: '/dashboard/operator',
        analyst: '/dashboard/analyst',
        admin: '/dashboard/admin',
      };
      navigate(dashboardMap[role]);
    } else {
      setError('Login failed. Please try again.');
      setStep('credentials');
    }
  };

  const roles = [
    {
      value: 'operator' as UserRole,
      title: 'Operator',
      description: 'Live tracking, vessel monitoring, and alerts',
      icon: Ship,
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      value: 'analyst' as UserRole,
      title: 'Analyst',
      description: 'Charts, analytics, and trend analysis',
      icon: Anchor,
      color: 'bg-cyan-600 hover:bg-cyan-700',
    },
    {
      value: 'admin' as UserRole,
      title: 'Admin',
      description: 'System monitoring, logs, and data export',
      icon: Ship,
      color: 'bg-teal-600 hover:bg-teal-700',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_50%)]" />
      
      <Card className="w-full max-w-4xl relative z-10 border-blue-800 bg-slate-900/90 backdrop-blur">
        <CardHeader className="text-center pb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 p-4 rounded-full">
              <Ship className="w-12 h-12 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl text-white">Maritime Analytics Platform</CardTitle>
          <CardDescription className="text-blue-200 text-lg">
            {step === 'credentials' 
              ? 'Sign in to access vessel tracking and port analytics'
              : 'Select your role to continue'}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {step === 'credentials' ? (
            <form onSubmit={handleCredentialsSubmit} className="space-y-6 max-w-md mx-auto">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-blue-100">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="operator@maritime.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-800 border-blue-700 text-white placeholder:text-slate-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-blue-100">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-slate-800 border-blue-700 text-white placeholder:text-slate-400"
                />
              </div>

              {error && (
                <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Continue to Role Selection
              </Button>

              <div className="text-center text-sm text-blue-300 mt-4">
                Demo credentials: any email, password (min 6 chars)
              </div>
            </form>
          ) : (
            <div>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {roles.map((role) => {
                  const Icon = role.icon;
                  return (
                    <button
                      key={role.value}
                      onClick={() => handleRoleSelection(role.value)}
                      className={`${role.color} p-6 rounded-lg text-white transition-all transform hover:scale-105 hover:shadow-xl`}
                    >
                      <Icon className="w-12 h-12 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">{role.title}</h3>
                      <p className="text-sm text-blue-100">{role.description}</p>
                    </button>
                  );
                })}
              </div>

              {error && (
                <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-md text-sm text-center">
                  {error}
                </div>
              )}

              <Button
                onClick={() => setStep('credentials')}
                variant="outline"
                className="w-full mt-4 border-blue-700 text-blue-100 hover:bg-slate-800"
              >
                Back to Credentials
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
