import { AlertTriangle, Info, AlertCircle, CheckCircle } from 'lucide-react';

const alerts = [
  {
    id: 1,
    type: 'warning',
    title: 'High Congestion at Berth 7',
    message: 'Current wait time exceeds 45 minutes',
    time: '5 min ago',
    icon: AlertTriangle,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10'
  },
  {
    id: 2,
    type: 'error',
    title: 'Weather Alert',
    message: 'Strong winds expected in 2 hours',
    time: '12 min ago',
    icon: AlertCircle,
    color: 'text-red-400',
    bg: 'bg-red-500/10'
  },
  {
    id: 3,
    type: 'info',
    title: 'Vessel MV Oceanic Delayed',
    message: 'Estimated arrival delayed by 30 minutes',
    time: '25 min ago',
    icon: Info,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10'
  },
  {
    id: 4,
    type: 'success',
    title: 'Berth 3 Cleared',
    message: 'Now available for new vessel docking',
    time: '1 hour ago',
    icon: CheckCircle,
    color: 'text-teal-400',
    bg: 'bg-teal-500/10'
  },
  {
    id: 5,
    type: 'warning',
    title: 'Maintenance Scheduled',
    message: 'Berth 5 offline from 22:00 - 06:00',
    time: '2 hours ago',
    icon: AlertTriangle,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10'
  }
];

export function AlertsPanel() {
  return (
    <div className="bg-[#0f1629] border border-[#1e293b] rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white text-lg font-semibold mb-1">Recent Alerts</h3>
          <p className="text-slate-400 text-sm">Latest port notifications</p>
        </div>
        <button className="text-teal-400 hover:text-teal-300 text-sm font-medium">
          View All
        </button>
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="flex items-start gap-4 p-4 rounded-lg bg-[#0a0f1e] border border-[#1e293b] hover:border-teal-500/30 transition-colors"
          >
            <div className={`p-2 rounded-lg ${alert.bg}`}>
              <alert.icon className={`w-5 h-5 ${alert.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h4 className="text-white text-sm font-medium">{alert.title}</h4>
                <span className="text-slate-500 text-xs whitespace-nowrap">{alert.time}</span>
              </div>
              <p className="text-slate-400 text-xs">{alert.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
