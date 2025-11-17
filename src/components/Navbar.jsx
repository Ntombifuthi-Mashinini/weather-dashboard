import { Link } from 'react-router-dom';
import { useWeather } from '../hooks/useWeather';

export const Navbar = () => {
  const { darkMode, toggleDarkMode } = useWeather();

  return (
    <nav className={`${
      darkMode ? 'bg-gray-800' : 'bg-white'
    } shadow-lg mb-6 rounded-lg`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex space-x-8">
            <Link
              to="/"
              className={`${
                darkMode ? 'text-white hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'
              } px-3 py-2 rounded-md text-sm font-medium transition-colors`}
            >
              Dashboard
            </Link>
            <Link
              to="/favorites"
              className={`${
                darkMode ? 'text-white hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'
              } px-3 py-2 rounded-md text-sm font-medium transition-colors`}
            >
              Favorites
            </Link>
            <Link
              to="/settings"
              className={`${
                darkMode ? 'text-white hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'
              } px-3 py-2 rounded-md text-sm font-medium transition-colors`}
            >
              Settings
            </Link>
          </div>
          <button
            onClick={toggleDarkMode}
            className="px-4 py-2 bg-white bg-opacity-20 text-white rounded-lg hover:bg-opacity-30 transition-all"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  );
};