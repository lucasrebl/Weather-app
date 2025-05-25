<script setup lang="ts">
import { computed } from 'vue'
import type { WeatherData, Location } from '../types/weather'
import { getWeatherIcon, formatTemperature, getWeatherDescription } from '../utils/weatherUtils'

const props = defineProps<{
  weather: WeatherData
  location: Location
}>()

const weatherClass = computed(() => {
  if (!props.weather) return ''
  
  const code = props.weather.weatherCode
  
  // Map weather code to class
  if (code === 0) return 'weather-clear'
  if (code >= 1 && code <= 3) return 'weather-cloudy'
  if (code >= 51 && code <= 67) return 'weather-rain' // Drizzle and rain
  if (code >= 71 && code <= 77) return 'weather-snow'
  if (code >= 80 && code <= 99) return 'weather-storm' // Showers, thunderstorms
  
  return 'weather-clear' // Default
})

const formattedTemperature = computed(() => {
  return formatTemperature(props.weather.temperature)
})

const weatherDescription = computed(() => {
  return getWeatherDescription(props.weather.weatherCode)
})

const formattedDate = computed(() => {
  return new Date().toLocaleDateString('en-US', { 
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})
</script>

<template>
  <div class="weather-display" :class="weatherClass">
    <div class="weather-header">
      <div class="location-info">
        <h2>{{ location.name }}</h2>
        <p>{{ location.country }}</p>
      </div>
      <p class="weather-date">{{ formattedDate }}</p>
    </div>
    
    <div class="weather-body">
      <div class="weather-icon" v-html="getWeatherIcon(weather.weatherCode)"></div>
      
      <div class="weather-info">
        <div class="temperature">
          {{ formattedTemperature }}
        </div>
        <div class="description">
          {{ weatherDescription }}
        </div>
      </div>
    </div>
    
    <div class="weather-details">
      <div class="detail-item">
        <span class="detail-label">Humidity</span>
        <span class="detail-value">{{ weather.relativeHumidity }}%</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">Wind</span>
        <span class="detail-value">{{ weather.windSpeed }} km/h</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">Precipitation</span>
        <span class="detail-value">{{ weather.precipitation }} mm</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.weather-display {
  border-radius: 16px;
  overflow: hidden;
  padding: 1.5rem;
  color: white;
  transition: all 0.3s ease;
}

.weather-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.location-info h2 {
  margin: 0;
  font-size: 1.75rem;
  font-weight: 600;
}

.location-info p {
  margin: 0;
  font-size: 1rem;
  opacity: 0.9;
}

.weather-date {
  font-size: 0.875rem;
  opacity: 0.8;
}

.weather-body {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.weather-icon {
  width: 100px;
  height: 100px;
}

.weather-info {
  text-align: right;
}

.temperature {
  font-size: 3rem;
  font-weight: 600;
  line-height: 1;
  margin-bottom: 0.25rem;
}

.description {
  font-size: 1.25rem;
  opacity: 0.9;
}

.weather-details {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  padding: 1rem;
}

.detail-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.detail-label {
  font-size: 0.75rem;
  opacity: 0.8;
  margin-bottom: 0.25rem;
}

.detail-value {
  font-size: 1.25rem;
  font-weight: 500;
}

@media (max-width: 640px) {
  .weather-body {
    flex-direction: column;
    text-align: center;
  }
  
  .weather-info {
    text-align: center;
    margin-top: 1rem;
  }
  
  .temperature {
    font-size: 2.5rem;
  }
  
  .weather-details {
    grid-template-columns: 1fr;
  }
}
</style>