import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { TrendingUp, TrendingDown, BarChart3, PieChart as PieChartIcon, Activity, AlertCircle } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

// Mock data for voyage trends
const voyageTrendsData = [
  { month: "Jan", voyages: 145, cargo: 23000, revenue: 450 },
  { month: "Feb", voyages: 132, cargo: 21500, revenue: 425 },
  { month: "Mar", voyages: 168, cargo: 27000, revenue: 540 },
  { month: "Apr", voyages: 155, cargo: 25200, revenue: 505 },
  { month: "May", voyages: 178, cargo: 29500, revenue: 590 },
  { month: "Jun", voyages: 192, cargo: 31800, revenue: 635 },
];

// Port traffic statistics
const portTrafficData = [
  { day: "Mon", incoming: 42, outgoing: 38, delayed: 5 },
  { day: "Tue", incoming: 38, outgoing: 45, delayed: 3 },
  { day: "Wed", incoming: 51, outgoing: 42, delayed: 7 },
  { day: "Thu", incoming: 48, outgoing: 49, delayed: 4 },
  { day: "Fri", incoming: 55, outgoing: 52, delayed: 8 },
  { day: "Sat", incoming: 35, outgoing: 38, delayed: 2 },
  { day: "Sun", incoming: 28, outgoing: 32, delayed: 1 },
];

// Risk analysis data
const riskData = [
  { category: "Weather", value: 65 },
  { category: "Traffic", value: 78 },
  { category: "Maintenance", value: 45 },
  { category: "Security", value: 32 },
  { category: "Operational", value: 58 },
  { category: "Financial", value: 42 },
];

// Performance metrics data
const performanceData = [
  { port: "Port A", efficiency: 92, throughput: 8500, avgTurnaround: 18, satisfaction: 4.5 },
  { port: "Port B", efficiency: 88, throughput: 7200, avgTurnaround: 22, satisfaction: 4.2 },
  { port: "Port C", efficiency: 95, throughput: 9100, avgTurnaround: 16, satisfaction: 4.7 },
  { port: "Port D", efficiency: 85, throughput: 6800, avgTurnaround: 25, satisfaction: 4.0 },
  { port: "Port E", efficiency: 90, throughput: 8200, avgTurnaround: 19, satisfaction: 4.4 },
];

// Detailed analytics table data
const detailedAnalytics = [
  { id: 1, route: "Asia-Pacific", vessels: 45, avgDuration: "14.2 days", efficiency: 94, trend: "up" },
  { id: 2, route: "Trans-Atlantic", vessels: 38, avgDuration: "11.5 days", efficiency: 91, trend: "up" },
  { id: 3, route: "Mediterranean", vessels: 52, avgDuration: "8.3 days", efficiency: 88, trend: "down" },
  { id: 4, route: "Indian Ocean", vessels: 29, avgDuration: "16.8 days", efficiency: 86, trend: "down" },
  { id: 5, route: "Caribbean", vessels: 34, avgDuration: "9.7 days", efficiency: 92, trend: "up" },
];

export default function AnalystDashboard() {
  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Analyst Dashboard</h1>
          <p className="text-slate-600 mt-1">Advanced analytics and performance insights</p>
        </div>
        <div className="flex gap-3">
          <select className="px-4 py-2 border border-slate-300 rounded-lg bg-white text-sm">
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
            <option>Last Year</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            Export Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white border-slate-200 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-600" />
              Total Voyages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">1,125</div>
            <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              +12.5% vs last period
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-600" />
              Avg Efficiency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">91.2%</div>
            <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              +3.2% improvement
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
              <PieChartIcon className="w-4 h-4 text-emerald-600" />
              Total Cargo (TEU)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">158K</div>
            <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              +8.4% growth
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-orange-600" />
              Avg Delay Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">2.4h</div>
            <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
              <TrendingDown className="w-4 h-4" />
              +0.3h vs target
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Voyage Trends */}
        <Card className="shadow-lg border-slate-200">
          <CardHeader className="bg-gradient-to-r from-blue-800 to-blue-700 text-white">
            <CardTitle>Voyage Trends & Revenue Analysis</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={voyageTrendsData}>
                <defs>
                  <linearGradient id="colorVoyages" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
                <Legend />
                <Area type="monotone" dataKey="voyages" stroke="#3b82f6" fillOpacity={1} fill="url(#colorVoyages)" />
                <Area type="monotone" dataKey="revenue" stroke="#06b6d4" fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Port Traffic Statistics */}
        <Card className="shadow-lg border-slate-200">
          <CardHeader className="bg-gradient-to-r from-cyan-800 to-cyan-700 text-white">
            <CardTitle>Weekly Port Traffic Statistics</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={portTrafficData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
                <Legend />
                <Bar dataKey="incoming" fill="#10b981" radius={[8, 8, 0, 0]} />
                <Bar dataKey="outgoing" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                <Bar dataKey="delayed" fill="#f59e0b" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Risk Analysis Radar */}
        <Card className="shadow-lg border-slate-200">
          <CardHeader className="bg-gradient-to-r from-orange-800 to-orange-700 text-white">
            <CardTitle>Multi-Factor Risk Analysis</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={riskData}>
                <PolarGrid stroke="#cbd5e1" />
                <PolarAngleAxis dataKey="category" stroke="#64748b" />
                <PolarRadiusAxis stroke="#64748b" />
                <Radar name="Risk Level" dataKey="value" stroke="#f97316" fill="#f97316" fillOpacity={0.6} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Port Performance Comparison */}
        <Card className="shadow-lg border-slate-200">
          <CardHeader className="bg-gradient-to-r from-emerald-800 to-emerald-700 text-white">
            <CardTitle>Port Performance Comparison</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="port" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
                <Legend />
                <Line type="monotone" dataKey="efficiency" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="satisfaction" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics Table */}
      <Card className="shadow-lg border-slate-200">
        <CardHeader className="bg-gradient-to-r from-blue-900 to-blue-800 text-white">
          <CardTitle>Route Performance Analytics</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-100 border-b border-slate-200">
                <tr>
                  <th className="text-left p-4 text-sm font-semibold text-slate-700">Route Name</th>
                  <th className="text-left p-4 text-sm font-semibold text-slate-700">Active Vessels</th>
                  <th className="text-left p-4 text-sm font-semibold text-slate-700">Avg Duration</th>
                  <th className="text-left p-4 text-sm font-semibold text-slate-700">Efficiency</th>
                  <th className="text-left p-4 text-sm font-semibold text-slate-700">Trend</th>
                </tr>
              </thead>
              <tbody>
                {detailedAnalytics.map((row) => (
                  <tr key={row.id} className="border-b border-slate-100 hover:bg-blue-50 transition-colors">
                    <td className="p-4 font-medium text-slate-900">{row.route}</td>
                    <td className="p-4 text-slate-600">{row.vessels}</td>
                    <td className="p-4 text-slate-600">{row.avgDuration}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-200 rounded-full h-2 max-w-[100px]">
                          <div 
                            className={`h-2 rounded-full ${row.efficiency >= 90 ? 'bg-green-500' : row.efficiency >= 85 ? 'bg-blue-500' : 'bg-orange-500'}`}
                            style={{ width: `${row.efficiency}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-slate-700">{row.efficiency}%</span>
                      </div>
                    </td>
                    <td className="p-4">
                      {row.trend === 'up' ? (
                        <Badge className="bg-green-100 text-green-700 border-green-300">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Improving
                        </Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-700 border-red-300">
                          <TrendingDown className="w-3 h-3 mr-1" />
                          Declining
                        </Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {performanceData.map((port, idx) => (
          <Card key={idx} className="bg-white border-slate-200 shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">{port.port}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <p className="text-xs text-slate-500">Throughput (TEU)</p>
                <p className="text-lg font-bold text-slate-900">{port.throughput.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Avg Turnaround</p>
                <p className="text-sm font-semibold text-blue-600">{port.avgTurnaround}h</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Satisfaction</p>
                <p className="text-sm font-semibold text-amber-600">★ {port.satisfaction}/5</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}