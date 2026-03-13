import { 
  Ship, 
  BarChart3, 
  AlertTriangle, 
  Anchor, 
  Calendar, 
  Settings,
  FileText,
  Users
} from 'lucide-react';

const menuItems = [
  { icon: BarChart3, label: 'Dashboard', active: true },
  { icon: Ship, label: 'Vessels', active: false },
  { icon: Anchor, label: 'Berths', active: false },
  { icon: Calendar, label: 'Schedule', active: false },
  { icon: AlertTriangle, label: 'Alerts', active: false },
  { icon: FileText, label: 'Reports', active: false },
  { icon: Users, label: 'Personnel', active: false },
  { icon: Settings, label: 'Settings', active: false },
];

export function Sidebar() {
  return (
    <aside className="w-64 bg-[#0a0f1e] border-r border-[#1e293b] h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-[#1e293b]">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-teal-500 to-blue-600 p-2 rounded-lg">
            <Ship className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg">MarinePort</h1>
            <p className="text-slate-400 text-xs">Analytics Hub</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              item.active
                ? 'bg-gradient-to-r from-teal-500/20 to-blue-500/20 text-teal-400 border border-teal-500/30'
                : 'text-slate-400 hover:bg-[#1e293b] hover:text-white'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-[#1e293b]">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-[#0f1629] border border-[#1e293b]">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
            JD
          </div>
          <div className="flex-1">
            <p className="text-white text-sm font-medium">John Doe</p>
            <p className="text-slate-400 text-xs">Port Manager</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
