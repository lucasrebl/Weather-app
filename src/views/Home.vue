<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CitySearch from '../components/CitySearch.vue'
import WeatherDisplay from '../components/WeatherDisplay.vue'
import ForecastDisplay from '../components/ForecastDisplay.vue'
import MapComponent from '../components/MapComponent.vue'
import { fetchWeatherData, fetchForecastData } from '../services/weatherService'
import type { WeatherData, ForecastData, Location } from '../types/weather'

const weatherData = ref<WeatherData | null>(null)
const forecastData = ref<ForecastData | null>(null)
const loading = ref<boolean>(false)
const error = ref<string | null>(null)
const selectedLocation = ref<Location | null>(null)

const handleLocationSelect = async (location: Location) => {
  loading.value = true
  error.value = null
  selectedLocation.value = location
  
  try {
    const [weather, forecast] = await Promise.all([
      fetchWeatherData(location.latitude, location.longitude),
      fetchForecastData(location.latitude, location.longitude)
    ])
    
    weatherData.value = weather
    forecastData.value = forecast
  } catch (err) {
    console.error('Error fetching weather data:', err)
    error.value = 'Failed to fetch weather data. Please try again.'
  } finally {
    loading.value = false
  }
}

// Initialize with default location (Paris)
onMounted(async () => {
  const defaultLocation = {
    name: 'Paris',
    country: 'France',
    latitude: 48.8567,
    longitude: 2.3508
  }
  
  handleLocationSelect(defaultLocation)
})
</script>

<template>
  <div class="container">
    <div class="dashboard-grid">
      <section class="search-section">
        <CitySearch @location-selected="handleLocationSelect" />
      </section>
      
      <section class="weather-section" v-if="selectedLocation">
        <div v-if="loading" class="loading-container">
          <div class="loading-spinner"></div>
          <p>Loading weather data...</p>
        </div>
        
        <div v-else-if="error" class="error-message">
          {{ error }}
        </div>
        
        <div v-else-if="weatherData" class="weather-content">
          <WeatherDisplay 
            :weather="weatherData" 
            :location="selectedLocation" 
          />
          
          <ForecastDisplay 
            v-if="forecastData" 
            :forecast="forecastData" 
          />
        </div>
      </section>
      
      <section class="map-section">
        <MapComponent 
          :location="selectedLocation" 
          :weather="weatherData"
          @location-changed="handleLocationSelect" 
        />
      </section>
    </div>
  </div>
</template>

<style scoped>
.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-top: 1rem;
}

.search-section {
  grid-column: 1 / -1;
  animation: slideInDown 0.6s ease-out;
}

.weather-section, .map-section {
  height: 100%;
  min-height: 550px;
  animation: fadeInUp 0.8s ease-out;
}

.weather-content {
  animation: fadeIn 0.6s ease-out;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  gap: 1.5rem;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(14, 165, 233, 0.2);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-container p {
  color: var(--color-text-light);
  font-weight: 500;
  font-size: 1.05rem;
}

.error-message {
  padding: 1.5rem;
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.05) 100%);
  color: var(--color-error);
  border-radius: 12px;
  text-align: center;
  border: 1px solid rgba(239, 68, 68, 0.2);
  font-weight: 500;
  animation: shake 0.5s ease-in-out;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-5px);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(5px);
  }
}

/* Responsive layout */
@media (min-width: 768px) {
  .dashboard-grid {
    grid-template-columns: 0.8fr 1.2fr;
    gap: 2.5rem;
  }
  
  .search-section {
    grid-column: 1 / -1;
  }
  
  .weather-section {
    grid-column: 1;
    grid-row: 2;
    min-height: 600px;
  }
  
  .map-section {
    grid-column: 2;
    grid-row: 2;
    min-height: 600px;
  }
}

@media (min-width: 1200px) {
  .dashboard-grid {
    grid-template-columns: 0.75fr 1.25fr;
    gap: 3rem;
  }
  
  .weather-section {
    min-height: 650px;
  }
  
  .map-section {
    min-height: 650px;
  }
}

@media (max-width: 767px) {
  .dashboard-grid {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .map-section {
    order: 3;
  }
}
</style>