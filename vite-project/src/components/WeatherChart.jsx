import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const WeatherChart = ({ data, tab }) => {
  if (!data) return null;

  const formatted = data.map((entry) => ({
    time: new Date(entry.dt_txt).toLocaleTimeString([], { hour: 'numeric' }),
    Temperature: Math.round(entry.main.temp),
    Precipitation: Math.round(entry.pop * 100),
    Wind: entry.wind.speed,
  }));

  return (
    <div className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-4 mt-4">
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={formatted}>
          <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickMargin={8} />
          <YAxis stroke="#94a3b8" fontSize={12} tickMargin={6} />
          <Tooltip
            contentStyle={{ backgroundColor: '#1e293b', borderRadius: '8px', border: 'none' }}
            labelStyle={{ color: '#f8fafc' }}
            itemStyle={{ color: '#facc15' }}
          />
          <Line
            type="monotone"
            dataKey={tab}
            stroke="#facc15"
            strokeWidth={3}
            dot={{ r: 4, strokeWidth: 2, fill: '#facc15' }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeatherChart;