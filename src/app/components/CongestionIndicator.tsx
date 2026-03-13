import { AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';

type CongestionLevel = 'Low' | 'Medium' | 'High';

interface CongestionData {
  level: CongestionLevel;
  percentage: number;
  vessels: {
    inPort: number;
    waiting: number;
    capacity: number;
  };
  berthUtilization: {
    occupied: number;
    total: number;
  };
}

const currentCongestion: CongestionData = {
  level: 'Medium',
  percentage: 68,
  vessels: {
    inPort: 17,
    waiting: 3,
    capacity: 25
  },
  berthUtilization: {
    occupied: 14,
    total: 20
  }
};

const getLevelConfig = (level: CongestionLevel) => {
  switch (level) {
    case 'Low':
      return {
        icon: CheckCircle,
        color: 'text-green-400',
        bgColor: 'bg-green-500/10',
        borderColor: 'border-green-500/30',
        barColor: 'bg-green-500',
        description: 'Port operations running smoothly'
      };
    case 'Medium':
      return {
        icon: AlertCircle,
        color: 'text-amber-400',
        bgColor: 'bg-amber-500/10',
        borderColor: 'border-amber-500/30',
        barColor: 'bg-amber-500',
        description: 'Moderate traffic, monitor closely'
      };
    case 'High':
      return {
        icon: AlertTriangle,
        color: 'text-red-400',
        bgColor: 'bg-red-500/10',
        borderColor: 'border-red-500/30',
        barColor: 'bg-red-500',
        description: 'High congestion, delays expected'
      };
  }
};

export function CongestionIndicator() {
  const config = getLevelConfig(currentCongestion.level);
  const Icon = config.icon;

  return (
    <div className="bg-[#0f1629] border border-[#1e293b] rounded-lg p-6">
      <div className="mb-6">
        <h3 className="text-white text-lg font-semibold mb-1">Congestion Status</h3>
        <p className="text-slate-400 text-sm">Real-time port capacity monitoring</p>
      </div>

      {/* Severity Level Display */}
      <div className={`${config.bgColor} border ${config.borderColor} rounded-lg p-6 mb-6`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-lg ${config.bgColor}`}>
              <Icon className={`w-8 h-8 ${config.color}`} />
            </div>
            <div>
              <p className="text-slate-400 text-xs mb-1">Current Level</p>
              <p className={`${config.color} text-2xl font-bold`}>{currentCongestion.level}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-slate-400 text-xs mb-1">Capacity</p>
            <p className="text-white text-2xl font-bold">{currentCongestion.percentage}%</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative w-full h-3 bg-[#0a0f1e] rounded-full overflow-hidden mb-3">
          <div 
            className={`h-full ${config.barColor} rounded-full transition-all duration-500`}
            style={{ width: `${currentCongestion.percentage}%` }}
          />
        </div>
        
        <p className="text-slate-400 text-sm">{config.description}</p>
      </div>

      {/* Detailed Statistics */}
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-[#0a0f1e] border border-[#1e293b] rounded-lg p-4 text-center">
            <p className="text-slate-400 text-xs mb-2">In Port</p>
            <p className="text-white text-2xl font-semibold">{currentCongestion.vessels.inPort}</p>
            <p className="text-slate-500 text-xs mt-1">vessels</p>
          </div>
          <div className="bg-[#0a0f1e] border border-[#1e293b] rounded-lg p-4 text-center">
            <p className="text-slate-400 text-xs mb-2">Waiting</p>
            <p className="text-amber-400 text-2xl font-semibold">{currentCongestion.vessels.waiting}</p>
            <p className="text-slate-500 text-xs mt-1">vessels</p>
          </div>
          <div className="bg-[#0a0f1e] border border-[#1e293b] rounded-lg p-4 text-center">
            <p className="text-slate-400 text-xs mb-2">Capacity</p>
            <p className="text-teal-400 text-2xl font-semibold">{currentCongestion.vessels.capacity}</p>
            <p className="text-slate-500 text-xs mt-1">max</p>
          </div>
        </div>

        {/* Berth Utilization */}
        <div className="bg-[#0a0f1e] border border-[#1e293b] rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-slate-400 text-sm">Berth Utilization</p>
            <p className="text-white font-semibold">
              {currentCongestion.berthUtilization.occupied}/{currentCongestion.berthUtilization.total}
            </p>
          </div>
          <div className="relative w-full h-2 bg-[#0f1629] rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-teal-500 to-blue-500 rounded-full"
              style={{ 
                width: `${(currentCongestion.berthUtilization.occupied / currentCongestion.berthUtilization.total) * 100}%` 
              }}
            />
          </div>
        </div>

        {/* Severity Thresholds */}
        <div className="bg-[#0a0f1e] border border-[#1e293b] rounded-lg p-4">
          <p className="text-slate-400 text-xs mb-3 font-medium">SEVERITY THRESHOLDS</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-slate-400">Low</span>
              </div>
              <span className="text-slate-500">0-50%</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                <span className="text-slate-400">Medium</span>
              </div>
              <span className="text-slate-500">51-80%</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-slate-400">High</span>
              </div>
              <span className="text-slate-500">81-100%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
