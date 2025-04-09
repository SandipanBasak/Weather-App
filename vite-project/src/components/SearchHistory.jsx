import React from 'react';
import { History } from 'lucide-react';

const SearchHistory = ({ history, onSelect }) => {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white rounded-2xl shadow-xl p-6 sm:p-8 mt-6">
      <div className="flex items-center gap-2 mb-4">
        <History className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        <h3 className="text-lg sm:text-xl font-semibold">Recent Searches</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {history.map((city) => (
          <button
            key={city}
            onClick={() => onSelect(city)}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-700 text-gray-800 dark:text-white text-sm rounded-full shadow-sm transition-all"
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;
