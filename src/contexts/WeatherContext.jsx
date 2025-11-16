import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { 
  fetchWeatherByCity, 
  fetchWeatherByCoords, 
  fetchForecastByCity,
  fetchForecastByCoords 
} from '../services/weatherService';
import { WeatherContext } from './weatherContextDefinition';

export const WeatherProvider = ({ children }) => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [favorites, setFavorites] = useLocalStorage('favoriteCities', []);
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);
  const [temperatureUnit, setTemperatureUnit] = useLocalStorage('temperatureUnit', 'C');

  const getWeatherByCity = async (cityName) => {
    try {
      setLoading(true);
      setError(null);
      
      const [weatherData, forecastData] = await Promise.all([
        fetchWeatherByCity(cityName),
        fetchForecastByCity(cityName)
      ]);
      
      setWeather(weatherData);
      setForecast(forecastData);
      return weatherData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getWeatherByCoords = async (lat, lon) => {
    try {
      setLoading(true);
      setError(null);
      
      const [weatherData, forecastData] = await Promise.all([
        fetchWeatherByCoords(lat, lon),
        fetchForecastByCoords(lat, lon)
      ]);
      
      setWeather(weatherData);
      setForecast(forecastData);
      return weatherData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = (cityName, note = '') => {
    if (!favorites.find(fav => fav.name === cityName)) {
      const newFavorite = {
        id: Date.now(),
        name: cityName,
        note: note,
        addedAt: new Date().toISOString()
      };
      setFavorites([...favorites, newFavorite]);
      return true;
    }
    return false;
  };

  const removeFromFavorites = (cityName) => {
    setFavorites(favorites.filter(fav => fav.name !== cityName));
  };

  const updateFavoriteNote = (cityName, newNote) => {
    setFavorites(favorites.map(fav => 
      fav.name === cityName ? { ...fav, note: newNote } : fav
    ));
  };


  const isFavorite = (cityName) => {
    return favorites.some(fav => fav.name === cityName);
  };


  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleTemperatureUnit = () => {
    setTemperatureUnit(temperatureUnit === 'C' ? 'F' : 'C');
  };


  const clearAllFavorites = () => {
    setFavorites([]);
  };

  const value = {
  
    weather,
    forecast,
    loading,
    error,
    favorites,
    darkMode,
    temperatureUnit,
    
    
    getWeatherByCity,
    getWeatherByCoords,
    addToFavorites,
    removeFromFavorites,
    updateFavoriteNote,
    isFavorite,
    toggleDarkMode,
    toggleTemperatureUnit,
    clearAllFavorites,
    setError
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
};