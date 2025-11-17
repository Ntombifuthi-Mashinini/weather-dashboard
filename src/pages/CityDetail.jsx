import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useWeather } from '../hooks/useWeather';
import { WeatherCard } from '../components/WeatherCard';
import { ForecastCard } from '../components/ForecastCard';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const CityDetail = () => {
  const { cityName } = useParams();
  const navigate = useNavigate();
  const {
    weather,
    forecast,
    loading,
    error,
    darkMode,
    temperatureUnit,
    getWeatherByCity,
    addToFavorites,
    isFavorite
  } = useWeather();

  useEffect(() => {
    if (cityName) {
      getWeatherByCity(cityName);
    }
  }, [cityName, getWeatherByCity]);

  const handleAddToFavorites = () => {
    if (weather) {
      addToFavorites(weather.name);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className={`rounded-lg shadow-lg p-8 text-center ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <p className="text-red-600 text-xl mb-4">{error}</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate(-1)}
        className={`px-4 py-2 rounded-lg ${
          darkMode
            ? 'bg-gray-800 text-white hover:bg-gray-700'
            : 'bg-white text-gray-800 hover:bg-gray-100'
        } shadow-lg transition-colors`}
      >
        ← Back
      </button>

      {weather && (
        <>
          <WeatherCard
            weather={weather}
            darkMode={darkMode}
            temperatureUnit={temperatureUnit}
            onAddToFavorites={handleAddToFavorites}
            isFavorite={isFavorite(weather.name)}
          />
          <ForecastCard
            forecast={forecast}
            darkMode={darkMode}
            temperatureUnit={temperatureUnit}
          />
        </>
      )}
    </div>
  );
};