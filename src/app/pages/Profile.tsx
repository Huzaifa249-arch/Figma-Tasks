import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { User, Mail, Shield, Clock, Activity } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();

  const activityLog = [
    { id: 1, action: 'Viewed Vessel Tracking', timestamp: '2026-03-18 10:45:23' },
    { id: 2, action: 'Exported Analytics Report', timestamp: '2026-03-18 09:30:15' },
    { id: 3, action: 'Updated Dashboard Settings', timestamp: '2026-03-17 16:20:45' },
    { id: 4, action: 'Logged In', timestamp: '2026-03-17 08:15:00' },
    { id: 5, action: 'Reviewed Port Analytics', timestamp: '2026-03-16 14:30:22' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 mb-2">Profile</h1>
          <p className="text-slate-600">Manage your account and preferences</p>
        </div>

        {/* Profile Overview */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              Account Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              
              <div className="flex-1 space-y-4">
                <div>
                  <p className="text-2xl font-semibold text-slate-900">{user?.name || 'User'}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className="bg-blue-600">
                      {user?.role.toUpperCase()}
                    </Badge>
                    <Badge variant="outline" className="border-green-600 text-green-600">
                      Active
                    </Badge>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 pt-4">
                  <div className="flex items-center gap-3 text-slate-600">
                    <Mail className="w-4 h-4" />
                    <span>{user?.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <Shield className="w-4 h-4" />
                    <span>Role: {user?.role}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Edit Profile */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue={user?.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue={user?.email} />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input id="department" placeholder="Operations" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Input id="timezone" defaultValue="UTC-8 (Pacific Time)" />
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Save Changes
                </Button>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              Security Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Update Password
              </Button>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-200">
              <h4 className="font-medium text-slate-900 mb-3">Two-Factor Authentication</h4>
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-600">Add an extra layer of security to your account</p>
                <Button variant="outline">Enable 2FA</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity Log */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activityLog.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4 border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                  <div className="w-2 h-2 bg-blue-600 rounded-full" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                      <Clock className="w-3 h-3" />
                      <span>{activity.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900">Email Notifications</p>
                  <p className="text-sm text-slate-600">Receive updates about vessel activities</p>
                </div>
                <input type="checkbox" className="w-4 h-4" defaultChecked />
              </div>
              <div className="flex items-center justify-between border-t border-slate-200 pt-4">
                <div>
                  <p className="font-medium text-slate-900">Alert Notifications</p>
                  <p className="text-sm text-slate-600">Get notified about critical alerts</p>
                </div>
                <input type="checkbox" className="w-4 h-4" defaultChecked />
              </div>
              <div className="flex items-center justify-between border-t border-slate-200 pt-4">
                <div>
                  <p className="font-medium text-slate-900">Weekly Reports</p>
                  <p className="text-sm text-slate-600">Receive weekly analytics summary</p>
                </div>
                <input type="checkbox" className="w-4 h-4" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
