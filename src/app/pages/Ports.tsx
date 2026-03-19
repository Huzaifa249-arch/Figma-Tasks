import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Anchor, Search, TrendingUp, Ship, Clock, Package } from 'lucide-react';
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Ports() {
  const [searchQuery, setSearchQuery] = useState('');

  const ports = [
    { id: 1, name: 'Singapore Port', country: '🇸🇬 Singapore', vessels: 142, capacity: 95, traffic: 2850, avgWait: 2.1, efficiency: 98 },
    { id: 2, name: 'Shanghai Port', country: '🇨🇳 China', vessels: 128, capacity: 88, traffic: 2420, avgWait: 3.5, efficiency: 94 },
    { id: 3, name: 'Rotterdam Port', country: '🇳🇱 Netherlands', vessels: 98, capacity: 76, traffic: 1980, avgWait: 2.8, efficiency: 96 },
    { id: 4, name: 'Los Angeles Port', country: '🇺🇸 USA', vessels: 87, capacity: 82, traffic: 1650, avgWait: 4.2, efficiency: 89 },
    { id: 5, name: 'Hamburg Port', country: '🇩🇪 Germany', vessels: 76, capacity: 71, traffic: 1320, avgWait: 3.1, efficiency: 92 },
    { id: 6, name: 'Dubai Port', country: '🇦🇪 UAE', vessels: 65, capacity: 68, traffic: 1180, avgWait: 2.9, efficiency: 95 },
    { id: 7, name: 'Hong Kong Port', country: '🇭🇰 Hong Kong', vessels: 72, capacity: 79, traffic: 1420, avgWait: 3.3, efficiency: 91 },
    { id: 8, name: 'Antwerp Port', country: '🇧🇪 Belgium', vessels: 58, capacity: 65, traffic: 980, avgWait: 2.6, efficiency: 93 },
  ];

  const trafficData = [
    { port: 'Singapore', arrivals: 145, departures: 138 },
    { port: 'Shanghai', arrivals: 132, departures: 125 },
    { port: 'Rotterdam', arrivals: 98, departures: 102 },
    { port: 'LA', arrivals: 87, departures: 84 },
    { port: 'Hamburg', arrivals: 76, departures: 79 },
  ];

  const filteredPorts = ports.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCapacityColor = (capacity: number) => {
    if (capacity >= 90) return 'text-red-600';
    if (capacity >= 75) return 'text-orange-600';
    return 'text-green-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900 mb-2">Port Analytics</h1>
            <p className="text-slate-600">Global port monitoring and efficiency metrics</p>
          </div>
          <div className="w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search ports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Total Ports</p>
                  <p className="text-3xl font-semibold text-slate-900">{ports.length}</p>
                  <p className="text-sm text-blue-600 mt-1">Monitored</p>
                </div>
                <Anchor className="w-10 h-10 text-cyan-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Active Vessels</p>
                  <p className="text-3xl font-semibold text-slate-900">
                    {ports.reduce((sum, p) => sum + p.vessels, 0)}
                  </p>
                  <p className="text-sm text-green-600 mt-1">+18 today</p>
                </div>
                <Ship className="w-10 h-10 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Avg Efficiency</p>
                  <p className="text-3xl font-semibold text-slate-900">
                    {(ports.reduce((sum, p) => sum + p.efficiency, 0) / ports.length).toFixed(1)}%
                  </p>
                  <p className="text-sm text-green-600 mt-1">+2.3% this week</p>
                </div>
                <TrendingUp className="w-10 h-10 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Avg Wait Time</p>
                  <p className="text-3xl font-semibold text-slate-900">
                    {(ports.reduce((sum, p) => sum + p.avgWait, 0) / ports.length).toFixed(1)}h
                  </p>
                  <p className="text-sm text-green-600 mt-1">-0.4h improvement</p>
                </div>
                <Clock className="w-10 h-10 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Traffic Chart */}
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle>Port Traffic Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={trafficData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="port" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip />
                  <Bar dataKey="arrivals" fill="#0ea5e9" name="Arrivals" />
                  <Bar dataKey="departures" fill="#06b6d4" name="Departures" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Top Performers */}
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Top Performing Ports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ports
                  .sort((a, b) => b.efficiency - a.efficiency)
                  .slice(0, 5)
                  .map((port, index) => (
                    <div key={port.id} className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white font-semibold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-slate-900">{port.name}</p>
                        <p className="text-sm text-slate-500">{port.country}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">{port.efficiency}%</p>
                        <p className="text-xs text-slate-500">Efficiency</p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Port Details Table */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Anchor className="w-5 h-5 text-cyan-600" />
              Port Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Port Name</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Country</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Vessels</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Capacity</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Monthly Traffic</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Avg Wait</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Efficiency</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPorts.map((port) => (
                    <tr key={port.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-medium text-slate-900">{port.name}</td>
                      <td className="py-3 px-4 text-slate-600">{port.country}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Ship className="w-4 h-4 text-blue-600" />
                          <span className="text-slate-900">{port.vessels}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className={`font-medium ${getCapacityColor(port.capacity)}`}>
                            {port.capacity}%
                          </span>
                          <div className="w-16 bg-slate-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                port.capacity >= 90 ? 'bg-red-500' :
                                port.capacity >= 75 ? 'bg-orange-500' :
                                'bg-green-500'
                              }`}
                              style={{ width: `${port.capacity}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1 text-slate-600">
                          <Package className="w-4 h-4" />
                          <span>{port.traffic.toLocaleString()}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-600">{port.avgWait}h</td>
                      <td className="py-3 px-4">
                        <Badge 
                          variant={port.efficiency >= 95 ? 'default' : 'secondary'}
                          className={port.efficiency >= 95 ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}
                        >
                          {port.efficiency}%
                        </Badge>
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
