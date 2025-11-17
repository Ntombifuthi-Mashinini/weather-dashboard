import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWeather } from '../hooks/useWeather';
import { fetchWeatherByCity } from '../services/weatherService';
import { getWeatherIcon, formatTemperature } from '../utils/formatters';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const Favorites = () => {
  const {
    favorites,
    darkMode,
    temperatureUnit,
    removeFromFavorites,
    updateFavoriteNote
  } = useWeather();

  const [favoritesWithWeather, setFavoritesWithWeather] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingNote, setEditingNote] = useState(null);
  const [noteText, setNoteText] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadFavoritesWeather = async () => {
      if (!isMounted) return;
      setLoading(true);

      const weatherPromises = favorites.map(async (fav) => {
        try {
          const weather = await fetchWeatherByCity(fav.name);
          return { ...fav, weather };
        } catch {
          return { ...fav, weather: null };
        }
      });

      const results = await Promise.all(weatherPromises);
      
      if (isMounted) {
        setFavoritesWithWeather(results);
        setLoading(false);
      }
    };

    loadFavoritesWeather();

    return () => {
      isMounted = false;
    };
  }, [favorites]);

  const handleRemove = (cityName) => {
    removeFromFavorites(cityName);
  };

  const startEditingNote = (fav) => {
    setEditingNote(fav.id);
    setNoteText(fav.note || '');
  };

  const saveNote = (cityName) => {
    updateFavoriteNote(cityName, noteText);
    setEditingNote(null);
    setNoteText('');
  };

  const cancelEdit = () => {
    setEditingNote(null);
    setNoteText('');
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (favorites.length === 0) {
    return (
      <div className={`rounded-lg shadow-lg p-8 text-center ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <p className={`text-xl mb-4 ${
          darkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          No favorite cities yet!
        </p>
        <Link
          to="/"
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors inline-block"
        >
          Search for Cities
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className={`text-3xl font-bold ${
        darkMode ? 'text-white' : 'text-gray-800'
      }`}>
        My Favorite Cities ({favorites.length})
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favoritesWithWeather.map((fav) => (
          <div
            key={fav.id}
            className={`rounded-lg shadow-lg p-6 ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            {fav.weather ? (
              <>
                <Link
                  to={`/city/${fav.name}`}
                  className="block hover:opacity-80 transition-opacity"
                >
                  <div className="text-center mb-4">
                    <div className="text-6xl mb-2">
                      {getWeatherIcon(fav.weather.weather[0].main)}
                    </div>
                    <h3 className={`text-2xl font-bold mb-1 ${
                      darkMode ? 'text-white' : 'text-gray-800'
                    }`}>
                      {fav.name}
                    </h3>
                    <p className="text-3xl font-bold text-blue-600">
                      {formatTemperature(fav.weather.main.temp, temperatureUnit)}
                    </p>
                    <p className={`text-sm capitalize ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {fav.weather.weather[0].description}
                    </p>
                  </div>
                </Link>

                <div className={`mt-4 pt-4 border-t ${
                  darkMode ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  {editingNote === fav.id ? (
                    <div className="space-y-2">
                      <textarea
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        placeholder="Add a note..."
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          darkMode
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300'
                        }`}
                        rows="3"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => saveNote(fav.name)}
                          className="flex-1 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="flex-1 px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {fav.note && (
                        <p className={`text-sm mb-2 italic ${
                          darkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          "{fav.note}"
                        </p>
                      )}
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEditingNote(fav)}
                          className="flex-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                        >
                          {fav.note ? 'Edit Note' : 'Add Note'}
                        </button>
                        <button
                          onClick={() => handleRemove(fav.name)}
                          className="flex-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center">
                <h3 className={`text-xl font-bold mb-2 ${
                  darkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  {fav.name}
                </h3>
                <p className={`text-sm ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Unable to load weather
                </p>
                <button
                  onClick={() => handleRemove(fav.name)}
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};