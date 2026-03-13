import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Server, Database, Activity, Users, Download, RefreshCw, Settings, CheckCircle, XCircle, AlertTriangle, Clock } from "lucide-react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { useState } from "react";

// System performance data
const systemPerformanceData = [
  { time: "00:00", cpu: 45, memory: 62, network: 38 },
  { time: "04:00", cpu: 38, memory: 58, network: 42 },
  { time: "08:00", cpu: 72, memory: 75, network: 68 },
  { time: "12:00", cpu: 85, memory: 82, network: 78 },
  { time: "16:00", cpu: 68, memory: 71, network: 65 },
  { time: "20:00", cpu: 52, memory: 64, network: 48 },
];

// API endpoints status
const apiEndpoints = [
  { id: 1, endpoint: "/api/vessels/tracking", status: "operational", uptime: "99.99%", avgResponse: "45ms", requests: "2.4M" },
  { id: 2, endpoint: "/api/ports/analytics", status: "operational", uptime: "99.97%", avgResponse: "62ms", requests: "1.8M" },
  { id: 3, endpoint: "/api/weather/forecast", status: "operational", uptime: "99.95%", avgResponse: "128ms", requests: "890K" },
  { id: 4, endpoint: "/api/routes/optimization", status: "degraded", uptime: "98.12%", avgResponse: "342ms", requests: "456K" },
  { id: 5, endpoint: "/api/alerts/notifications", status: "operational", uptime: "99.98%", avgResponse: "38ms", requests: "3.1M" },
];

// System logs
const systemLogs = [
  { id: 1, timestamp: "2026-03-13 13:42:15", level: "info", service: "API Gateway", message: "Successfully processed batch of 1,250 vessel updates" },
  { id: 2, timestamp: "2026-03-13 13:41:58", level: "warning", service: "Database", message: "High query load detected on analytics database cluster" },
  { id: 3, timestamp: "2026-03-13 13:41:45", level: "error", service: "Route Service", message: "Timeout on route optimization calculation for vessel IMO-9876543" },
  { id: 4, timestamp: "2026-03-13 13:41:32", level: "info", service: "Auth Service", message: "User session created for operator@maritime.com" },
  { id: 5, timestamp: "2026-03-13 13:41:18", level: "info", service: "Cache Layer", message: "Cache hit ratio: 94.5% over last hour" },
  { id: 6, timestamp: "2026-03-13 13:41:05", level: "warning", service: "API Gateway", message: "Rate limit approaching for client IP 203.45.67.89" },
  { id: 7, timestamp: "2026-03-13 13:40:52", level: "info", service: "Data Sync", message: "Completed synchronization with AIS data provider" },
  { id: 8, timestamp: "2026-03-13 13:40:38", level: "info", service: "Notification", message: "Sent 47 alert notifications to active operators" },
];

// User activity data
const userActivityData = [
  { hour: "00-04", operators: 5, analysts: 2, admins: 1 },
  { hour: "04-08", operators: 12, analysts: 4, admins: 2 },
  { hour: "08-12", operators: 28, analysts: 15, admins: 5 },
  { hour: "12-16", operators: 32, analysts: 18, admins: 4 },
  { hour: "16-20", operators: 25, analysts: 12, admins: 3 },
  { hour: "20-24", operators: 15, analysts: 6, admins: 2 },
];

export default function AdminDashboard() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleExport = (type: string) => {
    alert(`Exporting ${type} data to CSV...`);
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-600 mt-1">System monitoring and platform management</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
            <Settings className="w-4 h-4" />
            System Settings
          </Button>
        </div>
      </div>

      {/* System Status KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-600 to-green-700 text-white border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium opacity-90 flex items-center gap-2">
              <Server className="w-4 h-4" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">Online</div>
            <p className="text-xs opacity-80 mt-2">Uptime: 99.98%</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium opacity-90 flex items-center gap-2">
              <Database className="w-4 h-4" />
              Database Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">Optimal</div>
            <p className="text-xs opacity-80 mt-2">Response: 12ms avg</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-600 to-purple-700 text-white border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium opacity-90 flex items-center gap-2">
              <Activity className="w-4 h-4" />
              API Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">8.5M</div>
            <p className="text-xs opacity-80 mt-2">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-cyan-600 to-cyan-700 text-white border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium opacity-90 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Active Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">142</div>
            <p className="text-xs opacity-80 mt-2">32 operators, 18 analysts</p>
          </CardContent>
        </Card>
      </div>

      {/* System Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Resource Usage */}
        <Card className="shadow-lg border-slate-200">
          <CardHeader className="bg-gradient-to-r from-blue-800 to-blue-700 text-white">
            <CardTitle>System Resource Usage (24h)</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={systemPerformanceData}>
                <defs>
                  <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorMemory" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorNetwork" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="time" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
                <Area type="monotone" dataKey="cpu" stroke="#3b82f6" fillOpacity={1} fill="url(#colorCpu)" name="CPU %" />
                <Area type="monotone" dataKey="memory" stroke="#f59e0b" fillOpacity={1} fill="url(#colorMemory)" name="Memory %" />
                <Area type="monotone" dataKey="network" stroke="#10b981" fillOpacity={1} fill="url(#colorNetwork)" name="Network %" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* User Activity */}
        <Card className="shadow-lg border-slate-200">
          <CardHeader className="bg-gradient-to-r from-purple-800 to-purple-700 text-white">
            <CardTitle>User Activity Distribution</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={userActivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="hour" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
                <Bar dataKey="operators" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                <Bar dataKey="analysts" fill="#06b6d4" radius={[8, 8, 0, 0]} />
                <Bar dataKey="admins" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* API Status Table */}
      <Card className="shadow-lg border-slate-200">
        <CardHeader className="bg-gradient-to-r from-blue-900 to-blue-800 text-white flex flex-row items-center justify-between">
          <CardTitle>API Endpoints Status</CardTitle>
          <Button 
            variant="secondary" 
            size="sm"
            onClick={() => handleExport('API Status')}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-100 border-b border-slate-200">
                <tr>
                  <th className="text-left p-4 text-sm font-semibold text-slate-700">Endpoint</th>
                  <th className="text-left p-4 text-sm font-semibold text-slate-700">Status</th>
                  <th className="text-left p-4 text-sm font-semibold text-slate-700">Uptime</th>
                  <th className="text-left p-4 text-sm font-semibold text-slate-700">Avg Response</th>
                  <th className="text-left p-4 text-sm font-semibold text-slate-700">Total Requests</th>
                </tr>
              </thead>
              <tbody>
                {apiEndpoints.map((api) => (
                  <tr key={api.id} className="border-b border-slate-100 hover:bg-blue-50 transition-colors">
                    <td className="p-4 font-mono text-sm text-slate-900">{api.endpoint}</td>
                    <td className="p-4">
                      {api.status === 'operational' ? (
                        <Badge className="bg-green-100 text-green-700 border-green-300 flex items-center gap-1 w-fit">
                          <CheckCircle className="w-3 h-3" />
                          Operational
                        </Badge>
                      ) : api.status === 'degraded' ? (
                        <Badge className="bg-orange-100 text-orange-700 border-orange-300 flex items-center gap-1 w-fit">
                          <AlertTriangle className="w-3 h-3" />
                          Degraded
                        </Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-700 border-red-300 flex items-center gap-1 w-fit">
                          <XCircle className="w-3 h-3" />
                          Down
                        </Badge>
                      )}
                    </td>
                    <td className="p-4 text-slate-600">{api.uptime}</td>
                    <td className="p-4 text-slate-600">{api.avgResponse}</td>
                    <td className="p-4 text-slate-600">{api.requests}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* System Logs Viewer */}
      <Card className="shadow-lg border-slate-200">
        <CardHeader className="bg-gradient-to-r from-slate-800 to-slate-700 text-white flex flex-row items-center justify-between">
          <CardTitle>System Logs (Real-time)</CardTitle>
          <div className="flex gap-2">
            <Button 
              variant="secondary" 
              size="sm"
              onClick={() => handleExport('System Logs')}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
            <Button 
              variant="secondary" 
              size="sm"
              onClick={handleRefresh}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="max-h-96 overflow-y-auto">
            <table className="w-full">
              <thead className="bg-slate-100 border-b border-slate-200 sticky top-0">
                <tr>
                  <th className="text-left p-4 text-sm font-semibold text-slate-700">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Timestamp
                    </div>
                  </th>
                  <th className="text-left p-4 text-sm font-semibold text-slate-700">Level</th>
                  <th className="text-left p-4 text-sm font-semibold text-slate-700">Service</th>
                  <th className="text-left p-4 text-sm font-semibold text-slate-700">Message</th>
                </tr>
              </thead>
              <tbody>
                {systemLogs.map((log) => (
                  <tr key={log.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-mono text-xs text-slate-600">{log.timestamp}</td>
                    <td className="p-4">
                      {log.level === 'info' && (
                        <Badge className="bg-blue-100 text-blue-700 border-blue-300">INFO</Badge>
                      )}
                      {log.level === 'warning' && (
                        <Badge className="bg-orange-100 text-orange-700 border-orange-300">WARN</Badge>
                      )}
                      {log.level === 'error' && (
                        <Badge className="bg-red-100 text-red-700 border-red-300">ERROR</Badge>
                      )}
                    </td>
                    <td className="p-4 font-medium text-slate-700">{log.service}</td>
                    <td className="p-4 text-sm text-slate-600">{log.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Data Export Options */}
      <Card className="shadow-lg border-slate-200">
        <CardHeader className="bg-gradient-to-r from-indigo-800 to-indigo-700 text-white">
          <CardTitle>Data Export & Management</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-slate-900 mb-2">Vessel Data</h3>
              <p className="text-sm text-slate-600 mb-4">Export all vessel tracking records</p>
              <Button 
                onClick={() => handleExport('Vessel Data')}
                className="w-full flex items-center justify-center gap-2"
                variant="outline"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </Button>
            </div>

            <div className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-slate-900 mb-2">Analytics Reports</h3>
              <p className="text-sm text-slate-600 mb-4">Export performance analytics</p>
              <Button 
                onClick={() => handleExport('Analytics Reports')}
                className="w-full flex items-center justify-center gap-2"
                variant="outline"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </Button>
            </div>

            <div className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-slate-900 mb-2">User Activity</h3>
              <p className="text-sm text-slate-600 mb-4">Export user access logs</p>
              <Button 
                onClick={() => handleExport('User Activity')}
                className="w-full flex items-center justify-center gap-2"
                variant="outline"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </Button>
            </div>

            <div className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-slate-900 mb-2">System Metrics</h3>
              <p className="text-sm text-slate-600 mb-4">Export system performance data</p>
              <Button 
                onClick={() => handleExport('System Metrics')}
                className="w-full flex items-center justify-center gap-2"
                variant="outline"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Platform Management Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white border-slate-200 shadow">
          <CardHeader>
            <CardTitle className="text-base">Database Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Total Records</span>
              <span className="font-semibold text-slate-900">2,847,392</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Storage Used</span>
              <span className="font-semibold text-slate-900">847 GB</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Query Rate</span>
              <span className="font-semibold text-blue-600">1,245/sec</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Cache Hit Ratio</span>
              <span className="font-semibold text-green-600">94.5%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 shadow">
          <CardHeader>
            <CardTitle className="text-base">Security & Access</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Total Users</span>
              <span className="font-semibold text-slate-900">487</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Active Sessions</span>
              <span className="font-semibold text-slate-900">142</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Failed Logins</span>
              <span className="font-semibold text-orange-600">8 (24h)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">API Keys Active</span>
              <span className="font-semibold text-green-600">23</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 shadow">
          <CardHeader>
            <CardTitle className="text-base">System Resources</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">CPU Usage</span>
              <span className="font-semibold text-slate-900">68%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Memory Usage</span>
              <span className="font-semibold text-slate-900">71%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Network I/O</span>
              <span className="font-semibold text-blue-600">2.4 GB/s</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Disk I/O</span>
              <span className="font-semibold text-green-600">458 MB/s</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
