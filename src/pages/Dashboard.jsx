import { useEffect, useState, useCallback } from 'react';
import { useWeather } from '../hooks/useWeather';
import { SearchBar } from '../components/SearchBar';
import { WeatherCard } from '../components/WeatherCard';
import { ForecastCard } from '../components/ForecastCard';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const Dashboard = () => {
  const {
    weather,
    forecast,
    loading,
    error,
    darkMode,
    temperatureUnit,
    getWeatherByCity,
    getWeatherByCoords,
    addToFavorites,
    isFavorite,
    setError
  } = useWeather();

  const [gettingLocation, setGettingLocation] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Only load default city once on mount
    if (!initialized) {
      getWeatherByCity('Durban');
      setInitialized(true);
    }
  }, [initialized, getWeatherByCity]);

  const handleSearch = async (cityName) => {
    try {
      await getWeatherByCity(cityName);
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          await getWeatherByCoords(latitude, longitude);
        } catch (err) {
          console.error('Location error:', err);
        } finally {
          setGettingLocation(false);
        }
      },
      () => {
        setGettingLocation(false);
        setError('Unable to retrieve your location');
      }
    );
  };

  const handleAddToFavorites = () => {
    if (weather) {
      addToFavorites(weather.name);
    }
  };

  return (
    <div className="space-y-6">
      <SearchBar
        onSearch={handleSearch}
        onUseLocation={handleUseMyLocation}
        gettingLocation={gettingLocation}
        darkMode={darkMode}
      />

      {loading && <LoadingSpinner />}

      {error && (
        <div className={`rounded-lg shadow-lg p-6 ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <p className="text-red-600 text-center">{error}</p>
        </div>
      )}

      {!loading && weather && (
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