import { useState } from 'react';

export const SearchBar = ({ onSearch, onUseLocation, gettingLocation, darkMode }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
      setSearchInput('');
    }
  };

  return (
    <div className={`rounded-lg shadow-lg p-6 ${
      darkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      <div className="flex gap-2">
        <form onSubmit={handleSubmit} className="flex gap-2 flex-1">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search for a city..."
            className={`flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Search
          </button>
        </form>
        <button
          onClick={onUseLocation}
          disabled={gettingLocation}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-400"
        >
          {gettingLocation ? '📍...' : '📍 My Location'}
        </button>
      </div>
    </div>
  );
};