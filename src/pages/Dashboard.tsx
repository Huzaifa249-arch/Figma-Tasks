import { Ship, Anchor, AlertCircle, TrendingUp } from 'lucide-react';
import { Link } from 'react-router';

export default function Dashboard() {
  const stats = [
    { name: 'Active Vessels', value: '2,847', icon: Ship, change: '+12%', color: 'from-blue-500 to-cyan-500' },
    { name: 'Ports Monitored', value: '124', icon: Anchor, change: '+5%', color: 'from-emerald-500 to-teal-500' },
    { name: 'Active Alerts', value: '18', icon: AlertCircle, change: '-8%', color: 'from-orange-500 to-red-500' },
    { name: 'Tracked Routes', value: '1,432', icon: TrendingUp, change: '+23%', color: 'from-purple-500 to-pink-500' },
  ];

  const recentVessels = [
    { name: 'MSC Gulsun', type: 'Container Ship', status: 'In Transit', speed: '18.5 knots', eta: '2h 30m' },
    { name: 'Atlantic Star', type: 'Oil Tanker', status: 'Anchored', speed: '0 knots', eta: '-' },
    { name: 'Pacific Queen', type: 'Bulk Carrier', status: 'In Transit', speed: '14.2 knots', eta: '5h 15m' },
    { name: 'Nordic Wave', type: 'Container Ship', status: 'Docked', speed: '0 knots', eta: '-' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#0A4B6E] mb-2">Dashboard</h1>
        <p className="text-gray-600">Overview of maritime operations and vessel tracking</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <span className={`text-sm font-semibold ${stat.change.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-1">{stat.name}</p>
              <p className="text-3xl font-bold text-[#0A4B6E]">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Vessels & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Vessels */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#0A4B6E]">Recent Vessel Activity</h2>
            <Link
              to="/vessels"
              className="text-sm text-[#1E88B5] hover:text-[#0A4B6E] font-semibold transition"
            >
              View All →
            </Link>
          </div>
          <div className="space-y-4">
            {recentVessels.map((vessel, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-[#0A4B6E] to-[#1E88B5] p-3 rounded-xl">
                    <Ship className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0A4B6E]">{vessel.name}</h3>
                    <p className="text-sm text-gray-600">{vessel.type}</p>
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Status</p>
                    <p className="text-sm font-semibold text-gray-800">{vessel.status}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Speed</p>
                    <p className="text-sm font-semibold text-gray-800">{vessel.speed}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">ETA</p>
                    <p className="text-sm font-semibold text-gray-800">{vessel.eta}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-[#0A4B6E] to-[#1E88B5] rounded-2xl p-6 shadow-lg text-white">
            <Ship className="h-12 w-12 mb-4 text-cyan-300" />
            <h3 className="text-xl font-bold mb-2">Search Vessels</h3>
            <p className="text-cyan-100 text-sm mb-4">
              Find vessels by name, IMO, flag, or cargo type
            </p>
            <Link
              to="/vessels"
              className="inline-block bg-white text-[#0A4B6E] px-6 py-3 rounded-xl font-semibold hover:bg-cyan-50 transition"
            >
              Start Search
            </Link>
          </div>

          <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl p-6 shadow-lg text-white">
            <AlertCircle className="h-12 w-12 mb-4 text-emerald-200" />
            <h3 className="text-xl font-bold mb-2">Setup Alerts</h3>
            <p className="text-emerald-100 text-sm mb-4">
              Configure notifications for vessel movements
            </p>
            <Link
              to="/alerts"
              className="inline-block bg-white text-emerald-700 px-6 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition"
            >
              Manage Alerts
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
