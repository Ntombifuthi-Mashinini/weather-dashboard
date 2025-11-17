import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WeatherProvider } from './contexts/WeatherContext';
import { useWeather } from './hooks/useWeather';
import { Navbar } from './components/Navbar';
import { Dashboard } from './pages/Dashboard';
import { Favorites } from './pages/Favorites';
import { CityDetail } from './pages/CityDetail';
import { Settings } from './pages/Settings';

// Layout wrapper to access context
function AppLayout() {
  const { darkMode } = useWeather();

  return (
    <div className={`min-h-screen p-8 transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
        : 'bg-gradient-to-br from-blue-400 to-blue-600'
    }`}>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Weather Dashboard
        </h1>
        
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/city/:cityName" element={<CityDetail />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <WeatherProvider>
        <AppLayout />
      </WeatherProvider>
    </Router>
  );
}

export default App;