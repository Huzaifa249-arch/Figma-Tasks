import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Ship, Anchor, Navigation, AlertTriangle, TrendingUp, Activity } from 'lucide-react';

export default function OperatorDashboard() {
  const [vessels] = useState([
    { id: 1, name: 'MV Pacific Star', lat: 35.6762, lng: 139.6503, status: 'In Transit', speed: 18.5, heading: 285 },
    { id: 2, name: 'Ocean Navigator', lat: 34.0522, lng: -118.2437, status: 'Docked', speed: 0, heading: 0 },
    { id: 3, name: 'Atlantic Voyager', lat: 40.7128, lng: -74.0060, status: 'In Transit', speed: 21.3, heading: 92 },
    { id: 4, name: 'Baltic Express', lat: 51.5074, lng: -0.1278, status: 'Anchored', speed: 0.2, heading: 180 },
  ]);

  const [alerts] = useState([
    { id: 1, vessel: 'MV Pacific Star', type: 'Weather Warning', severity: 'high', time: '5 mins ago' },
    { id: 2, vessel: 'Ocean Navigator', type: 'Maintenance Due', severity: 'medium', time: '1 hour ago' },
    { id: 3, vessel: 'Atlantic Voyager', type: 'Route Deviation', severity: 'low', time: '2 hours ago' },
  ]);

  const kpis = [
    { title: 'Active Vessels', value: '247', change: '+12', icon: Ship, color: 'text-blue-600' },
    { title: 'In Transit', value: '189', change: '+8', icon: Navigation, color: 'text-cyan-600' },
    { title: 'Docked', value: '58', change: '+4', icon: Anchor, color: 'text-teal-600' },
    { title: 'Alerts', value: '23', change: '-5', icon: AlertTriangle, color: 'text-orange-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 mb-2">Operator Dashboard</h1>
          <p className="text-slate-600">Live vessel tracking and monitoring</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <Card key={index} className="border-slate-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">{kpi.title}</p>
                      <p className="text-3xl font-semibold text-slate-900">{kpi.value}</p>
                      <p className={`text-sm mt-1 ${kpi.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {kpi.change} today
                      </p>
                    </div>
                    <Icon className={`w-12 h-12 ${kpi.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Live Map */}
          <Card className="lg:col-span-2 border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Navigation className="w-5 h-5 text-blue-600" />
                Live Vessel Map
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg h-96 relative overflow-hidden">
                {/* Simplified map visualization */}
                <div className="absolute inset-0 opacity-20">
                  <svg className="w-full h-full" viewBox="0 0 800 400">
                    <path d="M 0 200 Q 200 180 400 200 T 800 200" stroke="#0ea5e9" strokeWidth="2" fill="none" />
                    <path d="M 0 250 Q 200 230 400 250 T 800 250" stroke="#0ea5e9" strokeWidth="2" fill="none" />
                  </svg>
                </div>
                
                {/* Vessel markers */}
                {vessels.map((vessel, idx) => (
                  <div
                    key={vessel.id}
                    className="absolute bg-blue-600 rounded-full w-3 h-3 animate-pulse"
                    style={{
                      left: `${20 + idx * 20}%`,
                      top: `${30 + (idx % 2) * 30}%`,
                    }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded shadow-lg text-xs whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                      {vessel.name}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Active Alerts */}
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                Active Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alerts.map((alert) => (
                  <div key={alert.id} className="border border-slate-200 rounded-lg p-3 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start justify-between mb-1">
                      <p className="font-medium text-sm text-slate-900">{alert.vessel}</p>
                      <Badge 
                        variant={alert.severity === 'high' ? 'destructive' : 'secondary'}
                        className={alert.severity === 'medium' ? 'bg-orange-100 text-orange-800' : ''}
                      >
                        {alert.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600">{alert.type}</p>
                    <p className="text-xs text-slate-400 mt-1">{alert.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Vessel List */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ship className="w-5 h-5 text-blue-600" />
              Active Vessels
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Vessel Name</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Position</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Speed (knots)</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Heading</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Activity</th>
                  </tr>
                </thead>
                <tbody>
                  {vessels.map((vessel) => (
                    <tr key={vessel.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-medium text-slate-900">{vessel.name}</td>
                      <td className="py-3 px-4">
                        <Badge 
                          variant={vessel.status === 'In Transit' ? 'default' : 'secondary'}
                          className={vessel.status === 'Docked' ? 'bg-green-100 text-green-800' : ''}
                        >
                          {vessel.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-600">
                        {vessel.lat.toFixed(4)}, {vessel.lng.toFixed(4)}
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-600">{vessel.speed}</td>
                      <td className="py-3 px-4 text-sm text-slate-600">{vessel.heading}°</td>
                      <td className="py-3 px-4">
                        <Activity className="w-4 h-4 text-green-600" />
                      </td>
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
