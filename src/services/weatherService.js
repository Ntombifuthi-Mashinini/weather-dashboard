const API_KEY = import.meta.env.VITE_WEATHER_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherByCity = async (cityName) => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${cityName}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('City not found');
    }
    
    return await response.json();
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch weather data');
  }
};

export const fetchWeatherByCoords = async (lat, lon) => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('Location not found');
    }
    
    return await response.json();
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch weather data');
  }
};

export const fetchForecastByCity = async (cityName) => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('Forecast not found');
    }
    
    return await response.json();
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch forecast data');
  }
};

export const fetchForecastByCoords = async (lat, lon) => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('Forecast not found');
    }
    
    return await response.json();
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch forecast data');
  }
};

export const getDailyForecasts = (forecastData) => {
  if (!forecastData || !forecastData.list) return [];
  
  const dailyData = [];
  const processedDates = new Set();
  
  forecastData.list.forEach(item => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    
    if (!processedDates.has(date) && dailyData.length < 5) {
      processedDates.add(date);
      dailyData.push(item);
    }
  });
  
  return dailyData;
};