import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Server, Database, Activity, Download, FileText, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminDashboard() {
  const [logs] = useState([
    { id: 1, timestamp: '2026-03-18 10:45:23', level: 'INFO', service: 'API Gateway', message: 'Request processed successfully', user: 'system' },
    { id: 2, timestamp: '2026-03-18 10:44:18', level: 'WARNING', service: 'Database', message: 'Slow query detected: 2.3s', user: 'analyst_01' },
    { id: 3, timestamp: '2026-03-18 10:43:55', level: 'ERROR', service: 'Auth Service', message: 'Failed login attempt', user: 'unknown' },
    { id: 4, timestamp: '2026-03-18 10:42:30', level: 'INFO', service: 'Vessel Tracker', message: 'Position update received', user: 'operator_05' },
    { id: 5, timestamp: '2026-03-18 10:41:12', level: 'INFO', service: 'Export Service', message: 'CSV export completed', user: 'admin' },
  ]);

  const apiMetrics = [
    { time: '10:00', requests: 1240, errors: 3, latency: 145 },
    { time: '10:15', requests: 1580, errors: 5, latency: 158 },
    { time: '10:30', requests: 1420, errors: 2, latency: 142 },
    { time: '10:45', requests: 1650, errors: 4, latency: 163 },
    { time: '11:00', requests: 1380, errors: 1, latency: 138 },
    { time: '11:15', requests: 1520, errors: 3, latency: 152 },
  ];

  const systemStats = [
    { label: 'API Uptime', value: '99.97%', icon: Server, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Database Load', value: '42%', icon: Database, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Active Sessions', value: '1,247', icon: Activity, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Avg Response', value: '152ms', icon: Clock, color: 'text-cyan-600', bg: 'bg-cyan-50' },
  ];

  const handleExport = (type: string) => {
    console.log(`Exporting ${type} data...`);
    // Simulate export
    alert(`${type} export started. Download will begin shortly.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900 mb-2">Admin Dashboard</h1>
            <p className="text-slate-600">System monitoring, logs, and data management</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => handleExport('Logs')} variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export Logs
            </Button>
            <Button onClick={() => handleExport('Analytics')} className="gap-2 bg-teal-600 hover:bg-teal-700">
              <FileText className="w-4 h-4" />
              Export Analytics
            </Button>
          </div>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {systemStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="border-slate-200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className={`${stat.bg} p-3 rounded-lg`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 mb-1">{stat.label}</p>
                      <p className="text-2xl font-semibold text-slate-900">{stat.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* API Performance Monitor */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-teal-600" />
              API Performance Monitor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={apiMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="time" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Line type="monotone" dataKey="requests" stroke="#0ea5e9" strokeWidth={2} name="Requests" />
                <Line type="monotone" dataKey="latency" stroke="#14b8a6" strokeWidth={2} name="Latency (ms)" />
                <Line type="monotone" dataKey="errors" stroke="#ef4444" strokeWidth={2} name="Errors" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* System Logs */}
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-teal-600" />
                Recent System Logs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {logs.map((log) => (
                  <div key={log.id} className="border border-slate-200 rounded-lg p-3 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        {log.level === 'ERROR' && <AlertCircle className="w-4 h-4 text-red-600" />}
                        {log.level === 'WARNING' && <AlertCircle className="w-4 h-4 text-orange-600" />}
                        {log.level === 'INFO' && <CheckCircle className="w-4 h-4 text-green-600" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge 
                            variant={log.level === 'ERROR' ? 'destructive' : log.level === 'WARNING' ? 'secondary' : 'default'}
                            className={log.level === 'WARNING' ? 'bg-orange-100 text-orange-800' : log.level === 'INFO' ? 'bg-green-100 text-green-800' : ''}
                          >
                            {log.level}
                          </Badge>
                          <span className="text-xs text-slate-500">{log.timestamp}</span>
                        </div>
                        <p className="text-sm font-medium text-slate-900">{log.service}</p>
                        <p className="text-sm text-slate-600 break-words">{log.message}</p>
                        <p className="text-xs text-slate-400 mt-1">User: {log.user}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Export Options */}
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-5 h-5 text-teal-600" />
                Data Export Center
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: 'Vessel Tracking Data', description: 'Export all vessel position and movement data', format: 'CSV, JSON' },
                  { title: 'Port Analytics', description: 'Port traffic and efficiency metrics', format: 'CSV, Excel' },
                  { title: 'Voyage Records', description: 'Complete voyage history and details', format: 'JSON, PDF' },
                  { title: 'System Logs', description: 'Application and API logs', format: 'TXT, JSON' },
                  { title: 'User Activity', description: 'User login and action history', format: 'CSV' },
                  { title: 'Performance Metrics', description: 'System performance data', format: 'CSV, JSON' },
                ].map((item, index) => (
                  <div key={index} className="border border-slate-200 rounded-lg p-4 hover:border-teal-300 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-slate-900 mb-1">{item.title}</h4>
                        <p className="text-sm text-slate-600 mb-2">{item.description}</p>
                        <p className="text-xs text-slate-500">Formats: {item.format}</p>
                      </div>
                      <Button 
                        onClick={() => handleExport(item.title)}
                        size="sm" 
                        variant="outline"
                        className="ml-4"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Service Status */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="w-5 h-5 text-teal-600" />
              Service Status Monitor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { service: 'API Gateway', status: 'operational', uptime: '99.98%', lastCheck: '30s ago' },
                { service: 'Vessel Tracker', status: 'operational', uptime: '99.95%', lastCheck: '45s ago' },
                { service: 'Database Cluster', status: 'operational', uptime: '99.99%', lastCheck: '20s ago' },
                { service: 'Auth Service', status: 'operational', uptime: '99.97%', lastCheck: '15s ago' },
                { service: 'Analytics Engine', status: 'degraded', uptime: '98.50%', lastCheck: '1m ago' },
                { service: 'Export Service', status: 'operational', uptime: '99.92%', lastCheck: '40s ago' },
              ].map((service, index) => (
                <div key={index} className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-slate-900">{service.service}</h4>
                    <Badge 
                      variant={service.status === 'operational' ? 'default' : 'secondary'}
                      className={service.status === 'operational' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                    >
                      {service.status}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-slate-600">Uptime: <span className="font-medium">{service.uptime}</span></p>
                    <p className="text-xs text-slate-500">Last checked: {service.lastCheck}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
