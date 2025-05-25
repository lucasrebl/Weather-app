import axios from 'axios'
import type { WeatherData, ForecastData } from '../types/weather'

const BASE_URL = 'https://api.open-meteo.com/v1'

/**
 * Fetch current weather data from Open-Meteo
 */
export async function fetchWeatherData(lat: number, lon: number): Promise<WeatherData> {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        latitude: lat,
        longitude: lon,
        current: 'temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m',
        timezone: 'auto'
      }
    })

    const { current } = response.data

    return {
      temperature: current.temperature_2m,
      weatherCode: current.weather_code,
      relativeHumidity: current.relative_humidity_2m,
      windSpeed: current.wind_speed_10m,
      precipitation: current.precipitation
    }
  } catch (error) {
    console.error('Error fetching weather data:', error)
    throw new Error('Failed to fetch weather data')
  }
}

/**
 * Fetch forecast data from Open-Meteo
 */
export async function fetchForecastData(lat: number, lon: number): Promise<ForecastData> {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        latitude: lat,
        longitude: lon,
        daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum',
        timezone: 'auto'
      }
    })

    const { daily } = response.data

    const dailyForecasts = daily.time.map((date: string, index: number) => {
      return {
        date,
        weatherCode: daily.weather_code[index],
        temperatureMax: daily.temperature_2m_max[index],
        temperatureMin: daily.temperature_2m_min[index],
        precipitation: daily.precipitation_sum[index]
      }
    })

    return {
      daily: dailyForecasts
    }
  } catch (error) {
    console.error('Error fetching forecast data:', error)
    throw new Error('Failed to fetch forecast data')
  }
}