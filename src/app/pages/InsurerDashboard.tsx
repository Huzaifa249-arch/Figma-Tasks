import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Shield, AlertTriangle, TrendingDown, FileText, DollarSign } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function InsurerDashboard() {
  const riskData = [
    { category: 'Low Risk', value: 145, color: '#10b981' },
    { category: 'Medium Risk', value: 78, color: '#f59e0b' },
    { category: 'High Risk', value: 24, color: '#ef4444' },
  ];

  const claimsData = [
    { month: 'Jan', claims: 12, approved: 10, denied: 2 },
    { month: 'Feb', claims: 15, approved: 13, denied: 2 },
    { month: 'Mar', claims: 9, approved: 8, denied: 1 },
    { month: 'Apr', claims: 18, approved: 15, denied: 3 },
    { month: 'May', claims: 14, approved: 12, denied: 2 },
    { month: 'Jun', claims: 11, approved: 10, denied: 1 },
  ];

  const premiumData = [
    { month: 'Jan', revenue: 2.4, payout: 0.8 },
    { month: 'Feb', revenue: 2.6, payout: 1.2 },
    { month: 'Mar', revenue: 2.5, payout: 0.6 },
    { month: 'Apr', revenue: 2.8, payout: 1.5 },
    { month: 'May', revenue: 2.7, payout: 1.1 },
    { month: 'Jun', revenue: 2.9, payout: 0.9 },
  ];

  const incidents = [
    { id: 1, vessel: 'MV Pacific Star', type: 'Weather Damage', severity: 'Medium', date: '2026-03-15', status: 'Under Review', claim: '$45,000' },
    { id: 2, vessel: 'Ocean Navigator', type: 'Collision', severity: 'High', date: '2026-03-12', status: 'Approved', claim: '$125,000' },
    { id: 3, vessel: 'Baltic Express', type: 'Mechanical Failure', severity: 'Low', date: '2026-03-10', status: 'Investigating', claim: '$18,000' },
    { id: 4, vessel: 'Nordic Star', type: 'Cargo Damage', severity: 'Medium', date: '2026-03-08', status: 'Denied', claim: '$52,000' },
  ];

  const COLORS = ['#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 mb-2">Insurance Dashboard</h1>
          <p className="text-slate-600">Risk assessment, claims management, and policy analytics</p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
              <p className="text-sm text-slate-600 mb-1">Active Policies</p>
              <p className="text-3xl font-semibold text-slate-900">247</p>
              <p className="text-sm text-green-600 mt-1">+12 this month</p>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <FileText className="w-8 h-8 text-orange-600" />
                <Badge className="bg-orange-100 text-orange-800">Pending</Badge>
              </div>
              <p className="text-sm text-slate-600 mb-1">Open Claims</p>
              <p className="text-3xl font-semibold text-slate-900">23</p>
              <p className="text-sm text-orange-600 mt-1">Requires review</p>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <DollarSign className="w-8 h-8 text-green-600" />
                <Badge className="bg-blue-100 text-blue-800">Monthly</Badge>
              </div>
              <p className="text-sm text-slate-600 mb-1">Premium Revenue</p>
              <p className="text-3xl font-semibold text-slate-900">$2.9M</p>
              <p className="text-sm text-green-600 mt-1">+7.4% vs last month</p>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <TrendingDown className="w-8 h-8 text-red-600" />
                <Badge className="bg-red-100 text-red-800">Total</Badge>
              </div>
              <p className="text-sm text-slate-600 mb-1">Claims Payout</p>
              <p className="text-3xl font-semibold text-slate-900">$0.9M</p>
              <p className="text-sm text-green-600 mt-1">-18% reduction</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle>Risk Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={riskData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ category, value }) => `${category}: ${value}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {riskData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {riskData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-slate-600">{item.category}</span>
                    </div>
                    <span className="font-medium text-slate-900">{item.value} vessels</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle>Claims Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={claimsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="approved" fill="#10b981" name="Approved" />
                  <Bar dataKey="denied" fill="#ef4444" name="Denied" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Premium Revenue Chart */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle>Premium Revenue vs Claims Payout</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={premiumData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#0ea5e9" strokeWidth={3} name="Revenue ($M)" />
                <Line type="monotone" dataKey="payout" stroke="#f59e0b" strokeWidth={3} name="Payout ($M)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Incidents */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              Recent Incidents & Claims
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Vessel</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Incident Type</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Severity</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Claim Amount</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {incidents.map((incident) => (
                    <tr key={incident.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-medium text-slate-900">{incident.vessel}</td>
                      <td className="py-3 px-4 text-slate-600">{incident.type}</td>
                      <td className="py-3 px-4">
                        <Badge
                          variant={incident.severity === 'High' ? 'destructive' : 'secondary'}
                          className={
                            incident.severity === 'Medium' ? 'bg-orange-100 text-orange-800' :
                            incident.severity === 'Low' ? 'bg-green-100 text-green-800' : ''
                          }
                        >
                          {incident.severity}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-slate-600">{incident.date}</td>
                      <td className="py-3 px-4 font-medium text-slate-900">{incident.claim}</td>
                      <td className="py-3 px-4">
                        <Badge
                          variant={incident.status === 'Approved' ? 'default' : 'secondary'}
                          className={
                            incident.status === 'Approved' ? 'bg-green-100 text-green-800' :
                            incident.status === 'Denied' ? 'bg-red-100 text-red-800' :
                            'bg-blue-100 text-blue-800'
                          }
                        >
                          {incident.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Policy Summary */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="border-slate-200">
            <CardContent className="p-6">
              <h4 className="text-sm font-medium text-slate-600 mb-4">Loss Ratio</h4>
              <div className="flex items-end gap-2 mb-2">
                <p className="text-4xl font-semibold text-slate-900">31%</p>
                <p className="text-sm text-green-600 mb-1">-5% vs target</p>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 mt-4">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '31%' }} />
              </div>
              <p className="text-xs text-slate-500 mt-2">Target: 36%</p>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardContent className="p-6">
              <h4 className="text-sm font-medium text-slate-600 mb-4">Avg Claim Processing</h4>
              <div className="flex items-end gap-2 mb-2">
                <p className="text-4xl font-semibold text-slate-900">4.2</p>
                <p className="text-sm text-slate-600 mb-1">days</p>
              </div>
              <p className="text-sm text-green-600 mt-2">-1.3 days improvement</p>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardContent className="p-6">
              <h4 className="text-sm font-medium text-slate-600 mb-4">Customer Satisfaction</h4>
              <div className="flex items-end gap-2 mb-2">
                <p className="text-4xl font-semibold text-slate-900">4.6</p>
                <p className="text-sm text-slate-600 mb-1">/ 5.0</p>
              </div>
              <p className="text-sm text-green-600 mt-2">+0.3 this quarter</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
