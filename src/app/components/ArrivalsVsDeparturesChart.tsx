import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { date: 'Feb 18', arrivals: 22, departures: 20, scheduled: 25 },
  { date: 'Feb 19', arrivals: 25, departures: 23, scheduled: 28 },
  { date: 'Feb 20', arrivals: 28, departures: 26, scheduled: 30 },
  { date: 'Feb 21', arrivals: 23, departures: 21, scheduled: 26 },
  { date: 'Feb 22', arrivals: 26, departures: 24, scheduled: 27 },
  { date: 'Feb 23', arrivals: 21, departures: 19, scheduled: 24 },
  { date: 'Feb 24', arrivals: 27, departures: 25, scheduled: 29 },
  { date: 'Feb 25', arrivals: 24, departures: 19, scheduled: 26 },
];

export function ArrivalsVsDeparturesChart() {
  return (
    <div className="bg-[#0f1629] border border-[#1e293b] rounded-lg p-6">
      <div className="mb-6">
        <h3 className="text-white text-lg font-semibold mb-1">Vessel Movement Analysis</h3>
        <p className="text-slate-400 text-sm">Daily arrivals vs departures comparison</p>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis 
            dataKey="date" 
            stroke="#64748b"
            style={{ fontSize: '12px' }}
            tick={{ fill: '#94a3b8' }}
          />
          <YAxis 
            stroke="#64748b"
            style={{ fontSize: '12px' }}
            tick={{ fill: '#94a3b8' }}
            label={{ value: 'Vessels', angle: -90, position: 'insideLeft', fill: '#94a3b8' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#0a0f1e', 
              border: '1px solid #1e293b',
              borderRadius: '8px',
              color: '#fff'
            }}
            labelStyle={{ color: '#94a3b8' }}
            cursor={{ fill: 'rgba(20, 184, 166, 0.1)' }}
          />
          <Legend 
            wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }}
          />
          <Bar 
            dataKey="arrivals" 
            fill="#14b8a6" 
            name="Arrivals"
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            dataKey="departures" 
            fill="#3b82f6" 
            name="Departures"
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            dataKey="scheduled" 
            fill="#64748b" 
            name="Scheduled"
            radius={[4, 4, 0, 0]}
            opacity={0.5}
          />
        </BarChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-[#1e293b]">
        <div>
          <p className="text-slate-400 text-xs mb-1">Today's Arrivals</p>
          <div className="flex items-baseline gap-2">
            <p className="text-teal-400 text-xl font-semibold">24</p>
            <span className="text-green-400 text-xs">+9% ↑</span>
          </div>
        </div>
        <div>
          <p className="text-slate-400 text-xs mb-1">Today's Departures</p>
          <div className="flex items-baseline gap-2">
            <p className="text-blue-400 text-xl font-semibold">19</p>
            <span className="text-red-400 text-xs">-5% ↓</span>
          </div>
        </div>
        <div>
          <p className="text-slate-400 text-xs mb-1">Net Change</p>
          <div className="flex items-baseline gap-2">
            <p className="text-white text-xl font-semibold">+5</p>
            <span className="text-slate-400 text-xs">vessels</span>
          </div>
        </div>
      </div>
    </div>
  );
}
