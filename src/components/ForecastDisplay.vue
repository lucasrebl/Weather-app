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
  margin-top: 3rem;
  animation: fadeInUp 0.8s ease-out 0.2s both;
}

.forecast-display h3 {
  margin: 0 0 1.5rem 0;
  color: var(--color-text);
  font-size: 1.5rem;
  font-weight: 700;
}

.forecast-scroll {
  overflow-x: auto;
  padding-bottom: 1rem;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
  border-radius: 12px;
}

.forecast-scroll::-webkit-scrollbar {
  height: 6px;
}

.forecast-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.forecast-scroll::-webkit-scrollbar-thumb {
  background: rgba(14, 165, 233, 0.3);
  border-radius: 3px;
}

.forecast-scroll::-webkit-scrollbar-thumb:hover {
  background: rgba(14, 165, 233, 0.5);
}

.forecast-grid {
  display: flex;
  gap: 1rem;
  padding: 0.5rem;
}

.forecast-day {
  flex: 0 0 auto;
  width: 120px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%);
  border-radius: 16px;
  padding: 1.2rem 1rem;
  text-align: center;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.95);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  position: relative;
}

.forecast-day::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.1) 0%, rgba(6, 182, 212, 0.05) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.forecast-day:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
}

.forecast-day:hover::before {
  opacity: 1;
}

.day-name {
  font-weight: 700;
  margin-bottom: 0.3rem;
  font-size: 1rem;
  color: var(--color-text);
}

.day-date {
  font-size: 0.75rem;
  color: var(--color-text-light);
  margin-bottom: 0.8rem;
  font-weight: 500;
}

.day-icon {
  height: 60px;
  margin-bottom: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.day-temp {
  display: flex;
  justify-content: center;
  gap: 0.8rem;
  align-items: center;
}

.max-temp {
  font-weight: 700;
  font-size: 1rem;
  color: var(--color-text);
}

.min-temp {
  font-size: 0.9rem;
  color: var(--color-text-light);
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

@media (max-width: 768px) {
  .forecast-day {
    width: 100px;
    padding: 1rem 0.8rem;
  }
  
  .day-icon {
    height: 50px;
    margin-bottom: 0.5rem;
  }
  
  .day-name {
    font-size: 0.9rem;
  }
}
</style>