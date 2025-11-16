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
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {weather.name}
              </h2>
              <p className="text-6xl font-bold text-blue-600 my-4">
                {Math.round(weather.main.temp)}°C
              </p>
              <p className="text-xl text-gray-600 capitalize">
                {weather.weather[0].description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;