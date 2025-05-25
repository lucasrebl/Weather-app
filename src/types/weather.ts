export interface WeatherData {
  temperature: number
  weatherCode: number
  relativeHumidity: number
  windSpeed: number
  precipitation: number
}

export interface DailyForecast {
  date: string
  weatherCode: number
  temperatureMax: number
  temperatureMin: number
  precipitation: number
}

export interface ForecastData {
  daily: DailyForecast[]
}

export interface Location {
  name: string
  country: string
  latitude: number
  longitude: number
}

declare global {
  interface Window {
    L: any // Leaflet global variable
  }
}