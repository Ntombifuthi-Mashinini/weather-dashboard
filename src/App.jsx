import { useState, useEffect } from 'react';

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('Durban');
  const [searchInput, setSearchInput] = useState('');

  const API_KEY = '1aabbeb10b9accf6e143e00834a885f7';

  useEffect(() => {
    fetchWeatherData(city);
  }, []);

  const fetchWeatherData = async (cityName) => {
    try {
      setLoading(true);
      setError(null);
      
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      
      if (!weatherResponse.ok) {
        throw new Error('City not found');
      }
      
      const weatherData = await weatherResponse.json();
      setWeather(weatherData);
      
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      
      const forecastData = await forecastResponse.json();
      setForecast(forecastData);
      setCity(cityName);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      fetchWeatherData(searchInput.trim());
      setSearchInput('');
    }
  };

  const getDailyForecasts = () => {
    if (!forecast) return [];
    
    const dailyData = [];
    const processedDates = new Set();
    
    forecast.list.forEach(item => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      
      if (!processedDates.has(date) && dailyData.length < 5) {
        processedDates.add(date);
        dailyData.push(item);
      }
    });
    
    return dailyData;
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Weather Dashboard
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search for a city..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Search
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          {loading && (
            <p className="text-gray-600 text-center">Loading weather data...</p>
          )}
          
          {error && (
            <p className="text-red-600 text-center">Error: {error}</p>
          )}
          
          {weather && !loading && (
            <div>
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {weather.name}, {weather.sys.country}
                </h2>
                <p className="text-6xl font-bold text-blue-600 my-4">
                  {Math.round(weather.main.temp)}°C
                </p>
                <p className="text-xl text-gray-600 capitalize mb-2">
                  {weather.weather[0].description}
                </p>
                <p className="text-sm text-gray-500">
                  Feels like {Math.round(weather.main.feels_like)}°C
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t">
                <div className="text-center">
                  <p className="text-gray-500 text-sm">Humidity</p>
                  <p className="text-2xl font-semibold text-gray-800">
                    {weather.main.humidity}%
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-gray-500 text-sm">Wind Speed</p>
                  <p className="text-2xl font-semibold text-gray-800">
                    {weather.wind.speed} m/s
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-gray-500 text-sm">Pressure</p>
                  <p className="text-2xl font-semibold text-gray-800">
                    {weather.main.pressure} hPa
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {forecast && !loading && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              5-Day Forecast
            </h3>
            <div className="grid grid-cols-5 gap-4">
              {getDailyForecasts().map((day, index) => (
                <div key={index} className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="font-semibold text-gray-700 mb-2">
                    {formatDate(day.dt)}
                  </p>
                  <p className="text-3xl font-bold text-blue-600 my-2">
                    {Math.round(day.main.temp)}°C
                  </p>
                  <p className="text-xs text-gray-600 capitalize">
                    {day.weather[0].description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;