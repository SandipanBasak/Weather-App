// App.jsx
import React, { useState, useEffect } from 'react';
import {
  Search,
  AlertCircle,
  Sun,
  Moon
} from 'lucide-react';
import WeatherChart from './components/WeatherChart';
import DailyForecast from './components/DailyForecast';
import SearchHistory from './components/SearchHistory';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [activeTab, setActiveTab] = useState('Temperature');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [theme, setTheme] = useState('light');

  const API_KEY = '43d26b20750e00e8c5b46e4990ddd7ee';

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'light';
    setTheme(storedTheme);
    document.documentElement.classList.toggle('dark', storedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const fetchWeather = async (searchCity) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) throw new Error('City not found');

      const data = await response.json();

      const grouped = data.list.reduce((acc, forecast) => {
        const date = forecast.dt_txt.split(' ')[0];
        acc[date] = acc[date] || [];
        acc[date].push(forecast);
        return acc;
      }, {});

      setWeatherData({
        city: data.city.name,
        grouped
      });

      setSelectedDate(Object.keys(grouped)[0]);

      setSearchHistory((prev) => {
        const newHistory = [searchCity, ...prev.filter((h) => h !== searchCity)].slice(0, 5);
        return newHistory;
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) fetchWeather(city.trim());
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 to-blue-300 dark:from-gray-900 dark:to-gray-800 transition-all duration-300 px-4 sm:px-8 md:px-12 py-6 sm:py-10 relative">

      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 p-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-full shadow transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 z-10"
        title="Toggle Theme"
      >
        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
      </button>

      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-10">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-blue-900 dark:text-white tracking-tight">
            Weather Forecast
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Search for a city..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow transition disabled:opacity-60 w-full sm:w-auto"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {error && (
          <div className="bg-red-100 dark:bg-red-200 border-l-4 border-red-500 p-4 rounded-lg shadow-sm flex items-start gap-2">
            <AlertCircle className="text-red-500" />
            <p className="text-red-700 text-sm sm:text-base">{error}</p>
          </div>
        )}

        {weatherData && (
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-blue-900 dark:text-white">
                {weatherData.city}
              </h2>
              <div className="flex gap-6 border-b border-gray-300 dark:border-gray-700 pb-2 mt-4">
                {['Temperature', 'Precipitation', 'Wind'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-sm sm:text-base font-medium pb-1 border-b-2 transition-colors duration-200 ${
                      activeTab === tab
                        ? 'border-yellow-400 text-yellow-400'
                        : 'border-transparent hover:border-yellow-300 text-gray-600 dark:text-gray-300'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <WeatherChart
              data={weatherData.grouped[selectedDate]}
              tab={activeTab}
            />

            <DailyForecast
              grouped={weatherData.grouped}
              selectedDate={selectedDate}
              onSelect={setSelectedDate}
            />
          </div>
        )}

        {searchHistory.length > 0 && (
          <SearchHistory history={searchHistory} onSelect={fetchWeather} />
        )}
      </div>
    </div>
  );
}

export default App;
