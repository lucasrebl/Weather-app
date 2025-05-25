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
  gap: 1.5rem;
  margin-top: 1rem;
}

.search-section {
  grid-column: 1 / -1;
}

.weather-section, .map-section {
  min-height: 300px;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

.error-message {
  padding: 1rem;
  background-color: var(--color-error);
  color: white;
  border-radius: 8px;
  text-align: center;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Responsive layout */
@media (min-width: 768px) {
  .dashboard-grid {
    grid-template-columns: 1fr 1fr;
  }
  
  .search-section {
    grid-column: 1 / -1;
  }
  
  .weather-section {
    grid-column: 1;
  }
  
  .map-section {
    grid-column: 2;
  }
}

@media (max-width: 767px) {
  .dashboard-grid {
    display: flex;
    flex-direction: column;
  }
  
  .map-section {
    order: 3;
  }
}
</style>