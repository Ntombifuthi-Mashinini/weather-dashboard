import { useState, useEffect } from 'react';

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = '1aabbeb10b9accf6e143e00834a885f7';
  const CITY = 'Durban';

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error('City not found');
      }
      
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Weather Dashboard
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
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
      </div>
    </div>
  );
}

export default App;