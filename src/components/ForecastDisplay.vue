<script setup lang="ts">
import { computed } from 'vue'
import type { ForecastData } from '../types/weather'
import { getWeatherIcon, formatTemperature } from '../utils/weatherUtils'

const props = defineProps<{
  forecast: ForecastData
}>()

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const formattedForecast = computed(() => {
  return props.forecast.daily.map((day, index) => {
    const date = new Date(day.date)
    const dayName = index === 0 ? 'Today' : days[date.getDay()]
    
    return {
      ...day,
      dayName,
      formattedDate: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      maxTemp: formatTemperature(day.temperatureMax),
      minTemp: formatTemperature(day.temperatureMin),
      icon: getWeatherIcon(day.weatherCode)
    }
  })
})
</script>

<template>
  <div class="forecast-display">
    <h3>7-Day Forecast</h3>
    
    <div class="forecast-scroll">
      <div class="forecast-grid">
        <div 
          v-for="(day, index) in formattedForecast" 
          :key="index"
          class="forecast-day"
        >
          <div class="day-name">{{ day.dayName }}</div>
          <div class="day-date">{{ day.formattedDate }}</div>
          <div class="day-icon" v-html="day.icon"></div>
          <div class="day-temp">
            <span class="max-temp">{{ day.maxTemp }}</span>
            <span class="min-temp">{{ day.minTemp }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.forecast-display {
  margin-top: 2rem;
}

.forecast-display h3 {
  margin-bottom: 1rem;
  color: var(--color-text);
}

.forecast-scroll {
  overflow-x: auto;
  padding-bottom: 0.5rem;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
}

.forecast-grid {
  display: flex;
  gap: 1rem;
}

.forecast-day {
  flex: 0 0 auto;
  width: 100px;
  background: var(--color-card-bg);
  border-radius: 12px;
  padding: 1rem 0.75rem;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.forecast-day:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.day-name {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.day-date {
  font-size: 0.75rem;
  color: var(--color-text-light);
  margin-bottom: 0.75rem;
}

.day-icon {
  height: 50px;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.day-temp {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.max-temp {
  font-weight: 600;
  font-size: 0.875rem;
}

.min-temp {
  font-size: 0.875rem;
  color: var(--color-text-light);
}

@media (max-width: 640px) {
  .forecast-day {
    width: 80px;
  }
}
</style>