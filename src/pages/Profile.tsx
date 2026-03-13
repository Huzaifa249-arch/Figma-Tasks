import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/Button';
import { 
  Ship, User, Mail, Phone, Shield, Edit, Lock, LogOut, Menu, X,
  BarChart3, MapPin, Anchor
} from 'lucide-react';

interface UserData {
  fullName: string;
  email: string;
  role: string;
  phoneNumber: string;
}

export function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editData, setEditData] = useState({
    fullName: '',
    email: '',
    phoneNumber: ''
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setEditData({
        fullName: parsedUser.fullName,
        email: parsedUser.email,
        phoneNumber: parsedUser.phoneNumber
      });
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleSaveProfile = () => {
    const updatedUser = {
      ...user!,
      fullName: editData.fullName,
      email: editData.email,
      phoneNumber: editData.phoneNumber
    };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-gradient-to-r from-red-500 to-pink-500';
      case 'analyst':
        return 'bg-gradient-to-r from-purple-500 to-indigo-500';
      case 'operator':
        return 'bg-gradient-to-r from-blue-500 to-cyan-500';
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-600';
    }
  };

  const getRoleBadge = (role: string) => {
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Ship className="w-10 h-10" />
              <div>
                <h1 className="text-2xl sm:text-3xl text-white">Maritime Portal</h1>
                <p className="text-blue-100 text-sm hidden sm:block">Vessel Tracking & Port Analytics</p>
              </div>
            </div>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 hover:bg-white/10 rounded-lg"
            >
              {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className={`
            ${isSidebarOpen ? 'block' : 'hidden'} lg:block
            w-full lg:w-64 bg-white rounded-xl shadow-md p-6 h-fit
          `}>
            <nav className="space-y-2">
              <button className="w-full flex items-center gap-3 px-4 py-3 text-left bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium shadow-lg">
                <User className="w-5 h-5" />
                Profile
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg">
                <Ship className="w-5 h-5" />
                Vessels
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg">
                <BarChart3 className="w-5 h-5" />
                Analytics
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg">
                <MapPin className="w-5 h-5" />
                Ports
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 px-6 sm:px-8 py-12">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center shadow-2xl">
                      <User className="w-16 h-16 text-blue-600" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-green-500 w-10 h-10 rounded-full border-4 border-white"></div>
                  </div>
                  <div className="text-center sm:text-left flex-1">
                    <h2 className="text-white mb-3">{user.fullName}</h2>
                    <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                      <span className={`px-5 py-2 rounded-full text-sm font-semibold ${getRoleColor(user.role)} text-white shadow-lg`}>
                        {getRoleBadge(user.role)}
                      </span>
                      <span className="px-5 py-2 rounded-full text-sm font-semibold bg-white/20 text-white">
                        Active
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Information */}
              <div className="px-6 sm:px-8 py-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-gray-900">Profile Information</h3>
                  {!isEditing && (
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      <span className="hidden sm:inline">Edit Profile</span>
                      <span className="sm:hidden">Edit</span>
                    </Button>
                  )}
                </div>

                {isEditing ? (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={editData.fullName}
                        onChange={(e) => setEditData({ ...editData, fullName: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={editData.email}
                        onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={editData.phoneNumber}
                        onChange={(e) => setEditData({ ...editData, phoneNumber: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex gap-3 pt-4">
                      <Button onClick={handleSaveProfile} className="flex-1 sm:flex-none">
                        Save Changes
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                        className="flex-1 sm:flex-none"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-start gap-4 p-5 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-100">
                      <User className="w-6 h-6 text-blue-600 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-600 mb-1">Full Name</p>
                        <p className="text-gray-900 font-medium">{user.fullName}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-5 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-100">
                      <Mail className="w-6 h-6 text-blue-600 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-600 mb-1">Email Address</p>
                        <p className="text-gray-900 font-medium">{user.email}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-5 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-100">
                      <Shield className="w-6 h-6 text-blue-600 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-600 mb-1">Role</p>
                        <p className="text-gray-900 font-medium">{getRoleBadge(user.role)}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-5 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-100">
                      <Phone className="w-6 h-6 text-blue-600 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-600 mb-1">Phone Number</p>
                        <p className="text-gray-900 font-medium">{user.phoneNumber}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                {!isEditing && (
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h4 className="text-gray-900 mb-4">Account Actions</h4>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        variant="outline"
                        className="flex items-center justify-center gap-2"
                        onClick={() => alert('Change password functionality')}
                      >
                        <Lock className="w-4 h-4" />
                        Change Password
                      </Button>
                      <Button
                        variant="secondary"
                        className="flex items-center justify-center gap-2"
                        onClick={handleLogout}
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Active Vessels</p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">142</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-4 rounded-xl shadow-lg">
                    <Ship className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Ports Monitored</p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">24</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500 to-indigo-500 p-4 rounded-xl shadow-lg">
                    <Anchor className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Reports Generated</p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">89</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-4 rounded-xl shadow-lg">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
