import { getWeatherIcon, formatDay, formatTemperature } from '../utils/formatters';
import { getDailyForecasts } from '../services/weatherService';

export const ForecastCard = ({ forecast, darkMode, temperatureUnit }) => {
  if (!forecast) return null;

  const dailyForecasts = getDailyForecasts(forecast);

  return (
    <div className={`rounded-lg shadow-lg p-4 md:p-6 ${
      darkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      <h3 className={`text-xl md:text-2xl font-bold mb-4 ${
        darkMode ? 'text-white' : 'text-gray-800'
      }`}>
        5-Day Forecast
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
        {dailyForecasts.map((day, index) => (
          <div key={index} className={`text-center p-2 md:p-3 rounded-lg ${
            darkMode ? 'bg-gray-700' : 'bg-blue-50'
          }`}>
            <p className={`font-semibold mb-2 text-sm md:text-base ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {formatDay(day.dt)}
            </p>
            <div className="text-3xl md:text-4xl my-2">
              {getWeatherIcon(day.weather[0].main)}
            </div>
            <p className="text-xl md:text-2xl font-bold text-blue-600 my-2">
              {formatTemperature(day.main.temp, temperatureUnit)}
            </p>
            <p className={`text-xs capitalize ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {day.weather[0].description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};