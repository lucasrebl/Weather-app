# Weather Dashboard

A modern weather dashboard built with Vue 3, TypeScript, and Vite that provides real-time weather information and forecasts using the Open-Meteo API.

## Features

- **City Search**: Search for any city worldwide with autocomplete suggestions
- **Current Weather**: Display current weather conditions including:
  - Temperature
  - Weather condition with icons
  - Humidity
  - Wind speed
  - Precipitation
- **7-Day Forecast**: View detailed weather forecasts for the next week
- **Interactive Map**: Click anywhere on the map to get weather information for that location
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Technologies Used

- Vue 3 with Composition API
- TypeScript
- Vite
- Leaflet.js for interactive maps
- Open-Meteo API for weather data
- Axios for API requests

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/lucasrebl/Weather-app.git
cd Weather-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
weather-dashboard/
├── src/
│   ├── components/        # Vue components
│   ├── services/         # API services
│   ├── types/           # TypeScript types
│   ├── utils/           # Utility functions
│   ├── views/           # Page components
│   ├── App.vue          # Root component
│   └── main.ts          # Application entry point
├── public/              # Static assets
└── index.html           # HTML entry point
```

## API Integration

The dashboard uses the Open-Meteo API for weather data:
- Current weather conditions
- 7-day forecasts
- Geocoding for location search

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Open-Meteo](https://open-meteo.com/) for providing the weather API
- [Leaflet](https://leafletjs.com/) for the interactive map functionality
- [Vue.js](https://vuejs.org/) for the excellent framework