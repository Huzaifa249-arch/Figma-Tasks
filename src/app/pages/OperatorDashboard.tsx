import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Ship, Anchor, AlertTriangle, TrendingUp, Navigation, MapPin } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// Mock data for arrivals/departures
const arrivalsData = [
  { time: "00:00", arrivals: 4, departures: 3 },
  { time: "04:00", arrivals: 2, departures: 5 },
  { time: "08:00", arrivals: 8, departures: 4 },
  { time: "12:00", arrivals: 12, departures: 7 },
  { time: "16:00", arrivals: 9, departures: 10 },
  { time: "20:00", arrivals: 6, departures: 8 },
];

const portActivityData = [
  { name: "Cargo", value: 45 },
  { name: "Tanker", value: 30 },
  { name: "Container", value: 25 },
];

const COLORS = ['#3b82f6', '#06b6d4', '#0ea5e9'];

// Mock vessel data
const activeVessels = [
  { id: 1, name: "Pacific Guardian", type: "Container", status: "Arriving", eta: "14:30", position: { x: 25, y: 30 } },
  { id: 2, name: "Atlantic Star", type: "Cargo", status: "Docked", eta: "—", position: { x: 70, y: 40 } },
  { id: 3, name: "Nordic Wave", type: "Tanker", status: "Departing", eta: "15:45", position: { x: 45, y: 60 } },
  { id: 4, name: "Southern Cross", type: "Container", status: "En Route", eta: "18:20", position: { x: 15, y: 75 } },
  { id: 5, name: "Eastern Pride", type: "Cargo", status: "Arriving", eta: "16:15", position: { x: 60, y: 25 } },
];

const alerts = [
  { id: 1, type: "warning", message: "High traffic expected at Berth 3", time: "2 min ago" },
  { id: 2, type: "info", message: "Weather advisory: Strong winds forecasted", time: "15 min ago" },
  { id: 3, type: "critical", message: "Vessel Nordic Wave requesting priority docking", time: "23 min ago" },
];

export default function OperatorDashboard() {
  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Operator Dashboard</h1>
          <p className="text-slate-600 mt-1">Live vessel monitoring and port operations</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-600">Last updated</p>
          <p className="text-lg font-semibold text-blue-900">13:42:15 UTC</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium opacity-90 flex items-center gap-2">
              <Ship className="w-4 h-4" />
              Active Vessels
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">28</div>
            <p className="text-xs opacity-80 mt-2 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +4 from yesterday
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-cyan-600 to-cyan-700 text-white border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium opacity-90 flex items-center gap-2">
              <Anchor className="w-4 h-4" />
              Vessels Docked
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">15</div>
            <p className="text-xs opacity-80 mt-2">Berth occupancy: 75%</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium opacity-90 flex items-center gap-2">
              <Navigation className="w-4 h-4" />
              En Route
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">13</div>
            <p className="text-xs opacity-80 mt-2">Expected within 24h</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-600 to-orange-700 text-white border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium opacity-90 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Active Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">3</div>
            <p className="text-xs opacity-80 mt-2">1 critical, 2 warnings</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vessel Map */}
        <Card className="lg:col-span-2 shadow-lg border-slate-200">
          <CardHeader className="bg-gradient-to-r from-blue-900 to-blue-800 text-white">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Live Vessel Tracking Map
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative bg-gradient-to-br from-blue-100 to-cyan-100 h-96">
              {/* Simple map representation */}
              <div className="absolute inset-0 p-6">
                {/* Port area */}
                <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-slate-700 rounded-lg shadow-lg border-2 border-slate-600">
                  <div className="text-white text-xs text-center mt-8">Main Port</div>
                </div>

                {/* Vessel markers */}
                {activeVessels.map((vessel) => (
                  <div
                    key={vessel.id}
                    className="absolute group cursor-pointer"
                    style={{ left: `${vessel.position.x}%`, top: `${vessel.position.y}%` }}
                  >
                    <div className="relative">
                      <Ship className="w-6 h-6 text-blue-700 drop-shadow-lg" />
                      <div className="absolute bottom-full mb-2 hidden group-hover:block bg-slate-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                        <div className="font-semibold">{vessel.name}</div>
                        <div className="text-blue-300">{vessel.type} - {vessel.status}</div>
                        {vessel.eta !== "—" && <div>ETA: {vessel.eta}</div>}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Route lines (decorative) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
                  <path d="M 50 250 Q 150 200, 250 150" stroke="#1e40af" strokeWidth="2" fill="none" strokeDasharray="5,5" />
                  <path d="M 100 300 Q 200 280, 300 220" stroke="#1e40af" strokeWidth="2" fill="none" strokeDasharray="5,5" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Alerts */}
        <Card className="shadow-lg border-slate-200">
          <CardHeader className="bg-gradient-to-r from-orange-700 to-orange-600 text-white">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Active Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert.id} className="p-3 border rounded-lg bg-white shadow-sm">
                  <div className="flex items-start gap-2">
                    <Badge 
                      variant={alert.type === 'critical' ? 'destructive' : 'default'}
                      className={alert.type === 'warning' ? 'bg-orange-500' : alert.type === 'info' ? 'bg-blue-500' : ''}
                    >
                      {alert.type}
                    </Badge>
                    <div className="flex-1">
                      <p className="text-sm text-slate-700">{alert.message}</p>
                      <p className="text-xs text-slate-500 mt-1">{alert.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Arrivals/Departures Chart */}
        <Card className="shadow-lg border-slate-200">
          <CardHeader className="bg-gradient-to-r from-blue-800 to-blue-700 text-white">
            <CardTitle>Arrivals & Departures (24h)</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={arrivalsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="time" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
                <Legend />
                <Bar dataKey="arrivals" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                <Bar dataKey="departures" fill="#06b6d4" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Port Activity Distribution */}
        <Card className="shadow-lg border-slate-200">
          <CardHeader className="bg-gradient-to-r from-blue-800 to-blue-700 text-white">
            <CardTitle>Vessel Type Distribution</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={portActivityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {portActivityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Live Vessel List */}
      <Card className="shadow-lg border-slate-200">
        <CardHeader className="bg-gradient-to-r from-blue-900 to-blue-800 text-white">
          <CardTitle>Active Vessel Roster</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-100 border-b border-slate-200">
                <tr>
                  <th className="text-left p-4 text-sm font-semibold text-slate-700">Vessel Name</th>
                  <th className="text-left p-4 text-sm font-semibold text-slate-700">Type</th>
                  <th className="text-left p-4 text-sm font-semibold text-slate-700">Status</th>
                  <th className="text-left p-4 text-sm font-semibold text-slate-700">ETA</th>
                </tr>
              </thead>
              <tbody>
                {activeVessels.map((vessel) => (
                  <tr key={vessel.id} className="border-b border-slate-100 hover:bg-blue-50 transition-colors">
                    <td className="p-4 font-medium text-slate-900">{vessel.name}</td>
                    <td className="p-4 text-slate-600">{vessel.type}</td>
                    <td className="p-4">
                      <Badge 
                        variant="outline"
                        className={
                          vessel.status === 'Docked' ? 'border-green-500 text-green-700 bg-green-50' :
                          vessel.status === 'Arriving' ? 'border-blue-500 text-blue-700 bg-blue-50' :
                          vessel.status === 'Departing' ? 'border-orange-500 text-orange-700 bg-orange-50' :
                          'border-cyan-500 text-cyan-700 bg-cyan-50'
                        }
                      >
                        {vessel.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-slate-600">{vessel.eta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}