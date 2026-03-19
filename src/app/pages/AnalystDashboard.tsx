import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, BarChart3, PieChart as PieChartIcon, Activity } from 'lucide-react';

export default function AnalystDashboard() {
  const trafficData = [
    { month: 'Jan', vessels: 245, cargo: 1820, passengers: 450 },
    { month: 'Feb', vessels: 268, cargo: 1950, passengers: 480 },
    { month: 'Mar', vessels: 290, cargo: 2100, passengers: 520 },
    { month: 'Apr', vessels: 310, cargo: 2280, passengers: 580 },
    { month: 'May', vessels: 335, cargo: 2450, passengers: 620 },
    { month: 'Jun', vessels: 358, cargo: 2680, passengers: 680 },
  ];

  const portDistribution = [
    { name: 'Singapore', value: 2850 },
    { name: 'Shanghai', value: 2420 },
    { name: 'Rotterdam', value: 1980 },
    { name: 'Los Angeles', value: 1650 },
    { name: 'Hamburg', value: 1320 },
  ];

  const delayAnalysis = [
    { category: 'Weather', count: 45, avgDelay: 3.2 },
    { category: 'Port Congestion', count: 78, avgDelay: 5.8 },
    { category: 'Mechanical', count: 23, avgDelay: 12.4 },
    { category: 'Administrative', count: 56, avgDelay: 2.1 },
    { category: 'Other', count: 34, avgDelay: 4.5 },
  ];

  const performanceData = [
    { week: 'Week 1', onTime: 85, delayed: 15 },
    { week: 'Week 2', onTime: 88, delayed: 12 },
    { week: 'Week 3', onTime: 82, delayed: 18 },
    { week: 'Week 4', onTime: 90, delayed: 10 },
    { week: 'Week 5', onTime: 87, delayed: 13 },
    { week: 'Week 6', onTime: 92, delayed: 8 },
  ];

  const COLORS = ['#0ea5e9', '#06b6d4', '#14b8a6', '#10b981', '#22c55e'];

  const metrics = [
    { title: 'Avg Transit Time', value: '12.4 days', change: '-8%', icon: TrendingUp, trend: 'down' },
    { title: 'On-Time Performance', value: '87.3%', change: '+5%', icon: Activity, trend: 'up' },
    { title: 'Port Efficiency', value: '92.1%', change: '+3%', icon: BarChart3, trend: 'up' },
    { title: 'Cargo Volume', value: '2.68M TEU', change: '+12%', icon: PieChartIcon, trend: 'up' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 mb-2">Analyst Dashboard</h1>
          <p className="text-slate-600">Maritime analytics, trends, and insights</p>
        </div>

        {/* KPI Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card key={index} className="border-slate-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Icon className="w-8 h-8 text-cyan-600" />
                    <span className={`text-sm font-medium ${metric.trend === 'up' ? 'text-green-600' : 'text-blue-600'}`}>
                      {metric.change}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mb-1">{metric.title}</p>
                  <p className="text-2xl font-semibold text-slate-900">{metric.value}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Charts Row 1 */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle>Monthly Traffic Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={trafficData}>
                  <defs>
                    <linearGradient id="colorVessels" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorCargo" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="vessels" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorVessels)" />
                  <Area type="monotone" dataKey="cargo" stroke="#06b6d4" fillOpacity={1} fill="url(#colorCargo)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle>Port Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={portDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {portDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle>Delay Analysis by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={delayAnalysis}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="category" stroke="#64748b" angle={-15} textAnchor="end" height={80} />
                  <YAxis stroke="#64748b" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#0ea5e9" name="Incidents" />
                  <Bar dataKey="avgDelay" fill="#f59e0b" name="Avg Delay (hrs)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle>Weekly Performance Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="week" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="onTime" stroke="#10b981" strokeWidth={3} name="On Time %" />
                  <Line type="monotone" dataKey="delayed" stroke="#ef4444" strokeWidth={3} name="Delayed %" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Summary Table */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle>Top Routes Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Route</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Vessels/Month</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Avg Duration</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">On-Time %</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Cargo Volume</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { route: 'Singapore → Rotterdam', vessels: 145, duration: '28 days', onTime: 92, cargo: '1.2M TEU', trend: '+8%' },
                    { route: 'Shanghai → Los Angeles', vessels: 132, duration: '14 days', onTime: 88, cargo: '980K TEU', trend: '+12%' },
                    { route: 'Hamburg → New York', vessels: 98, duration: '12 days', onTime: 85, cargo: '750K TEU', trend: '+5%' },
                    { route: 'Dubai → Singapore', vessels: 87, duration: '8 days', onTime: 94, cargo: '620K TEU', trend: '+15%' },
                  ].map((route, index) => (
                    <tr key={index} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-medium text-slate-900">{route.route}</td>
                      <td className="py-3 px-4 text-slate-600">{route.vessels}</td>
                      <td className="py-3 px-4 text-slate-600">{route.duration}</td>
                      <td className="py-3 px-4">
                        <span className={`${route.onTime >= 90 ? 'text-green-600' : 'text-orange-600'} font-medium`}>
                          {route.onTime}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-600">{route.cargo}</td>
                      <td className="py-3 px-4 text-green-600 font-medium">{route.trend}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
