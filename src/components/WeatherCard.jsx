import { getWeatherIcon, formatTime, formatTemperature } from '../utils/formatters';

export const WeatherCard = ({ weather, darkMode, temperatureUnit, onAddToFavorites, isFavorite }) => {
  if (!weather) return null;

  return (
    <div className={`rounded-lg shadow-lg p-4 md:p-6 ${
      darkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      <div className="text-center mb-6">
        <div className="text-6xl md:text-8xl mb-4">
          {getWeatherIcon(weather.weather[0].main)}
        </div>
        <h2 className={`text-2xl md:text-3xl font-bold mb-2 ${
          darkMode ? 'text-white' : 'text-gray-800'
        }`}>
          {weather.name}, {weather.sys.country}
        </h2>
        <button
          onClick={onAddToFavorites}
          disabled={isFavorite}
          className={`mb-4 px-4 py-2 rounded-lg transition-colors text-sm md:text-base ${
            isFavorite
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-yellow-400 text-yellow-900 hover:bg-yellow-500'
          }`}
        >
          {isFavorite ? '★ Saved' : '☆ Add to Favorites'}
        </button>
        <p className="text-4xl md:text-6xl font-bold text-blue-600 my-4">
          {formatTemperature(weather.main.temp, temperatureUnit)}
        </p>
        <p className={`text-lg md:text-xl capitalize mb-2 ${
          darkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {weather.weather[0].description}
        </p>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Feels like {formatTemperature(weather.main.feels_like, temperatureUnit)}
        </p>
      </div>

      <div className={`grid grid-cols-2 gap-4 mb-6 pb-6 border-b ${
        darkMode ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <div className="text-center">
          <p className={`text-xs md:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            🌅 Sunrise
          </p>
          <p className={`text-base md:text-xl font-semibold ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}>
            {formatTime(weather.sys.sunrise)}
          </p>
        </div>
        <div className="text-center">
          <p className={`text-xs md:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            🌇 Sunset
          </p>
          <p className={`text-base md:text-xl font-semibold ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}>
            {formatTime(weather.sys.sunset)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 md:gap-4">
        <div className="text-center">
          <p className={`text-xs md:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Humidity
          </p>
          <p className={`text-lg md:text-2xl font-semibold ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}>
            {weather.main.humidity}%
          </p>
        </div>
        <div className="text-center">
          <p className={`text-xs md:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Wind Speed
          </p>
          <p className={`text-lg md:text-2xl font-semibold ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}>
            {weather.wind.speed} m/s
          </p>
        </div>
        <div className="text-center">
          <p className={`text-xs md:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Pressure
          </p>
          <p className={`text-lg md:text-2xl font-semibold ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}>
            {weather.main.pressure} hPa
          </p>
        </div>
      </div>
    </div>
  );
};