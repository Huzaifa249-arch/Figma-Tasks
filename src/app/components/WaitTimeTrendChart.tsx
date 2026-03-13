import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { date: 'Feb 18', avgWaitTime: 42, peakWaitTime: 65, minWaitTime: 25 },
  { date: 'Feb 19', avgWaitTime: 38, peakWaitTime: 58, minWaitTime: 22 },
  { date: 'Feb 20', avgWaitTime: 45, peakWaitTime: 72, minWaitTime: 28 },
  { date: 'Feb 21', avgWaitTime: 40, peakWaitTime: 68, minWaitTime: 24 },
  { date: 'Feb 22', avgWaitTime: 35, peakWaitTime: 55, minWaitTime: 20 },
  { date: 'Feb 23', avgWaitTime: 33, peakWaitTime: 52, minWaitTime: 18 },
  { date: 'Feb 24', avgWaitTime: 36, peakWaitTime: 60, minWaitTime: 21 },
  { date: 'Feb 25', avgWaitTime: 32, peakWaitTime: 48, minWaitTime: 19 },
];

export function WaitTimeTrendChart() {
  return (
    <div className="bg-[#0f1629] border border-[#1e293b] rounded-lg p-6">
      <div className="mb-6">
        <h3 className="text-white text-lg font-semibold mb-1">Wait Time Trends</h3>
        <p className="text-slate-400 text-sm">7-day wait time analysis (minutes)</p>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
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
            label={{ value: 'Minutes', angle: -90, position: 'insideLeft', fill: '#94a3b8' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#0a0f1e', 
              border: '1px solid #1e293b',
              borderRadius: '8px',
              color: '#fff'
            }}
            labelStyle={{ color: '#94a3b8' }}
          />
          <Legend 
            wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }}
            iconType="line"
          />
          <Line 
            type="monotone" 
            dataKey="avgWaitTime" 
            stroke="#14b8a6" 
            strokeWidth={3}
            name="Average Wait Time"
            dot={{ fill: '#14b8a6', r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line 
            type="monotone" 
            dataKey="peakWaitTime" 
            stroke="#f59e0b" 
            strokeWidth={2}
            name="Peak Wait Time"
            dot={{ fill: '#f59e0b', r: 3 }}
            strokeDasharray="5 5"
          />
          <Line 
            type="monotone" 
            dataKey="minWaitTime" 
            stroke="#3b82f6" 
            strokeWidth={2}
            name="Minimum Wait Time"
            dot={{ fill: '#3b82f6', r: 3 }}
            strokeDasharray="5 5"
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-[#1e293b]">
        <div className="text-center">
          <p className="text-slate-400 text-xs mb-1">Current Avg</p>
          <p className="text-teal-400 text-xl font-semibold">32 min</p>
        </div>
        <div className="text-center">
          <p className="text-slate-400 text-xs mb-1">7-Day Avg</p>
          <p className="text-white text-xl font-semibold">37 min</p>
        </div>
        <div className="text-center">
          <p className="text-slate-400 text-xs mb-1">Improvement</p>
          <p className="text-green-400 text-xl font-semibold">-13.5%</p>
        </div>
      </div>
    </div>
  );
}
