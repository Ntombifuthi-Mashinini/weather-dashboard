import { useContext } from 'react';
import { WeatherContext } from '../contexts/weatherContextDefinition';

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within WeatherProvider');
  }
  return context;
};