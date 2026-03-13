import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Button } from '../components/Button';
import { Ship, Anchor } from 'lucide-react';

export function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'operator'
  });

  const roleOptions = [
    { value: 'operator', label: 'Operator' },
    { value: 'analyst', label: 'Analyst' },
    { value: 'admin', label: 'Admin' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify({
      fullName: formData.fullName,
      email: formData.email,
      role: formData.role,
      phoneNumber: '+1 (555) 123-4567'
    }));
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 backdrop-blur-lg p-6 rounded-3xl shadow-2xl border border-white/30">
              <Ship className="w-14 h-14 text-white" />
            </div>
          </div>
          <h1 className="text-white mb-2 text-4xl">Maritime Portal</h1>
          <p className="text-blue-100 text-lg">Vessel Tracking & Port Analytics</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Anchor className="w-7 h-7 text-blue-600" />
            <h2 className="text-gray-900">Sign In</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />

            <Select
              label="Role"
              options={roleOptions}
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              required
            />

            <Button type="submit" className="w-full mt-6">
              Login
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 hover:text-blue-700 font-semibold">
                Register here
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-blue-100">
          <p className="text-sm">© 2026 Maritime Analytics. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
