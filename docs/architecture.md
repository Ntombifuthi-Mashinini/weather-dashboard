# Weather Dashboard - Architecture Documentation

## Project Overview
A comprehensive weather dashboard application that allows users to search for weather information, save favorite cities with notes, and view detailed forecasts.

## Technology Stack
- Frontend Framework: React 18
- Build Tool: Vite
- Styling: Tailwind CSS
- Routing: React Router v6
- State Management: React Context API
- API**: OpenWeatherMap API
- Deployment: Vercel

## Folder Structure

src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx
│   ├── WeatherCard.jsx
│   ├── ForecastCard.jsx
│   ├── SearchBar.jsx
│   └── LoadingSpinner.jsx
├── contexts/           # React Context for state management
│   └── WeatherContext.jsx
├── pages/              # Route pages
│   ├── Dashboard.jsx
│   ├── Favorites.jsx
│   ├── CityDetail.jsx
│   └── Settings.jsx
├── services/           # API calls and external services
│   └── weatherService.js
├── utils/              # Helper functions
│   └── formatters.js
├── hooks/              # Custom React hooks
│   └── useLocalStorage.js
├── App.jsx             # Main app with routing
└── main.jsx            # Entry point

## Features

### 1. Dashboard (Home Page)
- Search for any city
- Display current weather
- Quick access to favorites
- Use current location

### 2. Favorites Management (CRUD)
- Create: Save favorite cities with custom notes
- Read: View all saved favorites with weather previews
- Delete: Remove favorites
- Quick navigation to city details

### 3. City Detail Page
- Detailed weather information
- 5-day forecast
- Sunrise/sunset times
- Additional metrics

### 4. Settings Page
- Dark/Light mode toggle
- Temperature unit preference
- Clear all data option

## State Management
- WeatherContext: Global state for weather data, favorites, and settings
- localStorage: Persist favorites and user preferences
- useLocalStorage hook: Custom hook for localStorage operations

## API Integration
- OpenWeatherMap API: Current weather and 5-day forecast
- Error handling and loading states
- Environment variables for API key security

## Routing Structure
- `/` - Dashboard (Home)
- `/favorites` - Favorites list with CRUD operations
- `/city/:cityName` - Detailed city weather
- `/settings` - User preferences

## Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly interface

## Git Workflow
- Feature branches for major updates
- Descriptive commit messages
- Regular commits with logical grouping