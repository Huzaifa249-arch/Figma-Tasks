import { Search, Menu } from 'lucide-react';
import { NotificationBell } from './NotificationDropdown';

export function Navbar() {
  return (
    <header className="bg-[#0a0f1e] border-b border-[#1e293b] px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button className="lg:hidden text-slate-400 hover:text-white">
            <Menu className="w-6 h-6" />
          </button>
          <div>
            <h2 className="text-white text-xl font-semibold">Port Analytics Dashboard</h2>
            <p className="text-slate-400 text-sm">Real-time monitoring and insights</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search vessels, berths..."
              className="bg-[#0f1629] border border-[#1e293b] text-white pl-10 pr-4 py-2 rounded-lg w-64 focus:outline-none focus:border-teal-500/50 placeholder:text-slate-500"
            />
          </div>

          {/* Notifications */}
          <NotificationBell />

          {/* Date/Time */}
          <div className="hidden lg:block text-right">
            <p className="text-white text-sm font-medium">Feb 25, 2026</p>
            <p className="text-slate-400 text-xs">14:32 UTC</p>
          </div>
        </div>
      </div>
    </header>
  );
}