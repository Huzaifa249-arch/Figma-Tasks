import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
}

export function StatCard({ title, value, subtitle, icon: Icon, trend }: StatCardProps) {
  return (
    <div className="bg-[#0f1629] border border-[#1e293b] rounded-lg p-6 hover:border-teal-500/50 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="bg-gradient-to-br from-teal-500/20 to-blue-500/20 p-3 rounded-lg">
          <Icon className="w-6 h-6 text-teal-400" />
        </div>
        {trend && (
          <span className={`text-sm font-medium ${trend.positive ? 'text-green-400' : 'text-red-400'}`}>
            {trend.positive ? '↑' : '↓'} {trend.value}
          </span>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-slate-400 text-sm">{title}</p>
        <p className="text-white text-3xl font-semibold">{value}</p>
        <p className="text-slate-500 text-xs">{subtitle}</p>
      </div>
    </div>
  );
}
