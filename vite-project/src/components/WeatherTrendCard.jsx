import React from 'react';
import { Droplets, Wind } from 'lucide-react';

const WeatherTrendCard = ({ weather }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-blue-900 dark:text-white">
        {weather.city} - 5 Day Forecast
      </h2>

      {Object.entries(weather.forecast).map(([date, entries]) => (
        <div key={date} className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow space-y-2">
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">{date}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {entries.map((entry) => (
              <div
                key={entry.dt}
                className="bg-gray-100 dark:bg-gray-800 p-3 rounded-xl text-center text-sm"
              >
                <p className="text-gray-600 dark:text-gray-300">{entry.dt_txt.split(' ')[1].slice(0, 5)}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${entry.weather[0].icon}@2x.png`}
                  alt={entry.weather[0].description}
                  className="mx-auto w-12 h-12"
                />
                <p className="font-medium">{Math.round(entry.main.temp)}°C</p>
                <div className="flex justify-center gap-2 text-xs text-gray-600 dark:text-gray-400 mt-1">
                  <Droplets className="w-4 h-4" />
                  {entry.main.humidity}%
                </div>
                <div className="flex justify-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                  <Wind className="w-4 h-4" />
                  {entry.wind.speed} km/h
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeatherTrendCard;
