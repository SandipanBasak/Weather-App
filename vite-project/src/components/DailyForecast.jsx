import React from 'react';

const DailyForecast = ({ grouped, selectedDate, onSelect }) => {
  return (
    <div className="flex gap-3 mt-8 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 pb-2">
      {Object.entries(grouped).map(([date, entries]) => {
        const day = new Date(date).toLocaleDateString(undefined, { weekday: 'short' });
        const icon = entries[0].weather[0].icon;
        const minTemp = Math.min(...entries.map(e => e.main.temp_min));
        const maxTemp = Math.max(...entries.map(e => e.main.temp_max));

        return (
          <button
            key={date}
            onClick={() => onSelect(date)}
            className={`flex flex-col items-center px-4 py-3 rounded-2xl transition-all duration-200 min-w-[72px] shadow-sm border ${
              selectedDate === date
                ? 'bg-blue-200 dark:bg-blue-800 border-blue-400 dark:border-blue-600'
                : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-blue-100 dark:hover:bg-gray-700'
            }`}
          >
            <p className="text-sm font-medium text-gray-700 dark:text-white mb-1">{day}</p>
            <img
              src={`https://openweathermap.org/img/wn/${icon}.png`}
              alt="icon"
              className="w-8 h-8 mb-1"
            />
            <p className="text-base font-semibold text-gray-800 dark:text-white">{Math.round(maxTemp)}°</p>
            <p className="text-xs text-gray-500 dark:text-gray-300">{Math.round(minTemp)}°</p>
          </button>
        );
      })}
    </div>
  );
};

export default DailyForecast;