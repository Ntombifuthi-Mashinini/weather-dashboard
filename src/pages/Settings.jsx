import { useWeather } from '../hooks/useWeather';

export const Settings = () => {
  const {
    darkMode,
    temperatureUnit,
    favorites,
    toggleDarkMode,
    toggleTemperatureUnit,
    clearAllFavorites
  } = useWeather();

  const handleClearFavorites = () => {
    if (window.confirm('Are you sure you want to clear all favorites?')) {
      clearAllFavorites();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className={`text-3xl font-bold ${
        darkMode ? 'text-white' : 'text-gray-800'
      }`}>
        Settings
      </h2>

      <div className={`rounded-lg shadow-lg p-6 space-y-6 ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        {/* Dark Mode Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`text-lg font-semibold ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Dark Mode
            </h3>
            <p className={`text-sm ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Toggle dark/light theme
            </p>
          </div>
          <button
            onClick={toggleDarkMode}
            className={`w-16 h-8 rounded-full transition-colors ${
              darkMode ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          >
            <div className={`w-6 h-6 rounded-full bg-white transform transition-transform ${
              darkMode ? 'translate-x-9' : 'translate-x-1'
            }`} />
          </button>
        </div>

        <hr className={darkMode ? 'border-gray-700' : 'border-gray-200'} />

        {/* Temperature Unit Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`text-lg font-semibold ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Temperature Unit
            </h3>
            <p className={`text-sm ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Currently: {temperatureUnit === 'C' ? 'Celsius' : 'Fahrenheit'}
            </p>
          </div>
          <button
            onClick={toggleTemperatureUnit}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Switch to {temperatureUnit === 'C' ? '°F' : '°C'}
          </button>
        </div>

        <hr className={darkMode ? 'border-gray-700' : 'border-gray-200'} />

        {/* Clear Favorites */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`text-lg font-semibold ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Clear All Favorites
            </h3>
            <p className={`text-sm ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              You have {favorites.length} favorite cities
            </p>
          </div>
          <button
            onClick={handleClearFavorites}
            disabled={favorites.length === 0}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* App Info */}
      <div className={`rounded-lg shadow-lg p-6 ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h3 className={`text-lg font-semibold mb-4 ${
          darkMode ? 'text-white' : 'text-gray-800'
        }`}>
          About
        </h3>
        <div className={`space-y-2 text-sm ${
          darkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          <p>Weather Dashboard v1.0</p>
          <p>Built with React, Vite, Tailwind CSS, and React Router</p>
          <p>Data provided by OpenWeatherMap API</p>
        </div>
      </div>
    </div>
  );
};