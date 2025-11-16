import { useState, useEffect } from 'react';

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [gettingLocation, setGettingLocation] = useState(false);

  const API_KEY = '1aabbeb10b9accf6e143e00834a885f7';

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteCities');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    fetchWeatherData('Durban');
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
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      setLoading(true);
      setError(null);
      
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      
      if (!weatherResponse.ok) {
        throw new Error('Location not found');
      }
      
      const weatherData = await weatherResponse.json();
      setWeather(weatherData);
      
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      
      const forecastData = await forecastResponse.json();
      setForecast(forecastData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setGettingLocation(false);
    }
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByCoords(latitude, longitude);
      },
      () => {
        setGettingLocation(false);
        setError('Unable to retrieve your location');
      }
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      fetchWeatherData(searchInput.trim());
      setSearchInput('');
    }
  };

  const addToFavorites = () => {
    if (weather && !favorites.includes(weather.name)) {
      const newFavorites = [...favorites, weather.name];
      setFavorites(newFavorites);
      localStorage.setItem('favoriteCities', JSON.stringify(newFavorites));
    }
  };

  const removeFromFavorites = (cityName) => {
    const newFavorites = favorites.filter(fav => fav !== cityName);
    setFavorites(newFavorites);
    localStorage.setItem('favoriteCities', JSON.stringify(newFavorites));
  };

  const getWeatherIcon = (weatherCondition) => {
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
          <div className="flex gap-2 mb-4">
            <form onSubmit={handleSearch} className="flex gap-2 flex-1">
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
            <button
              onClick={handleUseMyLocation}
              disabled={gettingLocation}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-400"
            >
              {gettingLocation ? '📍...' : '📍 My Location'}
            </button>
          </div>

      
          {favorites.length > 0 && (
            <div>
              <p className="text-sm text-gray-600 mb-2">Favorite Cities:</p>
              <div className="flex flex-wrap gap-2">
                {favorites.map((fav, index) => (
                  <div key={index} className="flex items-center gap-1 bg-blue-100 px-3 py-1 rounded-full">
                    <button
                      onClick={() => fetchWeatherData(fav)}
                      className="text-blue-700 hover:text-blue-900 font-medium"
                    >
                      {fav}
                    </button>
                    <button
                      onClick={() => removeFromFavorites(fav)}
                      className="text-red-500 hover:text-red-700 font-bold"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
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
                <div className="text-8xl mb-4">
                  {getWeatherIcon(weather.weather[0].main)}
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {weather.name}, {weather.sys.country}
                </h2>
                <button
                  onClick={addToFavorites}
                  disabled={favorites.includes(weather.name)}
                  className={`mb-4 px-4 py-2 rounded-lg transition-colors ${
                    favorites.includes(weather.name)
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-yellow-400 text-yellow-900 hover:bg-yellow-500'
                  }`}
                >
                  {favorites.includes(weather.name) ? '★ Saved' : '☆ Add to Favorites'}
                </button>
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
                  <div className="text-4xl my-2">
                    {getWeatherIcon(day.weather[0].main)}
                  </div>
                  <p className="text-2xl font-bold text-blue-600 my-2">
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