import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { time: '00:00', arrivals: 3, departures: 2, waiting: 8 },
  { time: '04:00', arrivals: 2, departures: 1, waiting: 9 },
  { time: '08:00', arrivals: 5, departures: 4, waiting: 10 },
  { time: '12:00', arrivals: 7, departures: 6, waiting: 11 },
  { time: '16:00', arrivals: 6, departures: 5, waiting: 12 },
  { time: '20:00', arrivals: 4, departures: 3, waiting: 10 },
  { time: '23:59', arrivals: 3, departures: 2, waiting: 9 },
];

export function PortChart() {
  return (
    <div className="bg-[#0f1629] border border-[#1e293b] rounded-lg p-6">
      <div className="mb-6">
        <h3 className="text-white text-lg font-semibold mb-1">Vessel Traffic Overview</h3>
        <p className="text-slate-400 text-sm">24-hour vessel movement analysis</p>
      </div>
      
      <ResponsiveContainer width="100%" height={350}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorArrivals" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorDepartures" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorWaiting" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis 
            dataKey="time" 
            stroke="#64748b"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#64748b"
            style={{ fontSize: '12px' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#0a0f1e', 
              border: '1px solid #1e293b',
              borderRadius: '8px',
              color: '#fff'
            }}
          />
          <Legend 
            wrapperStyle={{ color: '#94a3b8' }}
          />
          <Area 
            type="monotone" 
            dataKey="arrivals" 
            stroke="#14b8a6" 
            fill="url(#colorArrivals)" 
            strokeWidth={2}
            name="Arrivals"
          />
          <Area 
            type="monotone" 
            dataKey="departures" 
            stroke="#3b82f6" 
            fill="url(#colorDepartures)" 
            strokeWidth={2}
            name="Departures"
          />
          <Area 
            type="monotone" 
            dataKey="waiting" 
            stroke="#f59e0b" 
            fill="url(#colorWaiting)" 
            strokeWidth={2}
            name="Waiting"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
