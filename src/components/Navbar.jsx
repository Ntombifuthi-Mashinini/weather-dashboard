import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWeather } from '../hooks/useWeather';

export const Navbar = () => {
  const { darkMode, toggleDarkMode } = useWeather();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={`${
      darkMode ? 'bg-gray-800' : 'bg-white'
    } shadow-lg mb-6 rounded-lg`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden ${
              darkMode ? 'text-white' : 'text-gray-700'
            }`}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-8">
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

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className={`block ${
                darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
              } px-3 py-2 rounded-md text-base font-medium`}
            >
              Dashboard
            </Link>
            <Link
              to="/favorites"
              onClick={() => setIsOpen(false)}
              className={`block ${
                darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
              } px-3 py-2 rounded-md text-base font-medium`}
            >
              Favorites
            </Link>
            <Link
              to="/settings"
              onClick={() => setIsOpen(false)}
              className={`block ${
                darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
              } px-3 py-2 rounded-md text-base font-medium`}
            >
              Settings
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};