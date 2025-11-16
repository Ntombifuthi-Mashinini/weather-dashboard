export const formatTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
};

export const formatDay = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[date.getDay()];
};

export const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

export const getWeatherIcon = (weatherCondition) => {
  const condition = weatherCondition.toLowerCase();
  
  if (condition.includes('clear')) return '☀️';
  if (condition.includes('cloud')) return '☁️';
  if (condition.includes('rain')) return '🌧️';
  if (condition.includes('drizzle')) return '🌦️';
  if (condition.includes('thunder')) return '⛈️';
  if (condition.includes('snow')) return '❄️';
  if (condition.includes('mist') || condition.includes('fog')) return '🌫️';
  return '🌤️';
};

export const celsiusToFahrenheit = (celsius) => {
  return Math.round((celsius * 9/5) + 32);
};

export const formatTemperature = (temp, unit = 'C') => {
  if (unit === 'F') {
    return `${celsiusToFahrenheit(temp)}°F`;
  }
  return `${Math.round(temp)}°C`;
};