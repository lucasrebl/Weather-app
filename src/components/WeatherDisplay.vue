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
  border-radius: 20px;
  overflow: hidden;
  padding: 2.5rem;
  color: white;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: fadeInUp 0.6s ease-out;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
}

.weather-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 1.5rem;
}

.location-info h2 {
  margin: 0;
  font-size: 2.2rem;
  font-weight: 700;
  letter-spacing: -1px;
  line-height: 1.2;
}

.location-info p {
  margin: 0.5rem 0 0 0;
  font-size: 1.1rem;
  opacity: 0.85;
  font-weight: 500;
}

.weather-date {
  font-size: 0.95rem;
  opacity: 0.75;
  text-align: right;
  font-weight: 500;
}

.weather-body {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  gap: 2rem;
}

.weather-icon {
  width: 140px;
  height: 140px;
  flex-shrink: 0;
  animation: float 4s ease-in-out infinite;
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.2));
}

.weather-info {
  text-align: left;
}

.temperature {
  font-size: 4rem;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 0.5rem;
  letter-spacing: -2px;
}

.description {
  font-size: 1.4rem;
  opacity: 0.9;
  font-weight: 500;
}

.weather-details {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}

.detail-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.08);
  transition: all 0.3s ease;
}

.detail-item:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

.detail-label {
  font-size: 0.85rem;
  opacity: 0.7;
  margin-bottom: 0.5rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-value {
  font-size: 1.5rem;
  font-weight: 700;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}

@media (max-width: 768px) {
  .weather-display {
    padding: 2rem;
  }
  
  .weather-header {
    flex-direction: column;
    margin-bottom: 2rem;
  }
  
  .weather-date {
    text-align: left;
    margin-top: 1rem;
  }
  
  .weather-body {
    flex-direction: column;
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .weather-info {
    text-align: center;
  }
  
  .temperature {
    font-size: 3.5rem;
  }
  
  .weather-details {
    grid-template-columns: 1fr;
  }
}
</style>