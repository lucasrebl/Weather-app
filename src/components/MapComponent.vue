<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import type { WeatherData, Location } from '../types/weather'

const props = defineProps<{
  location?: Location | null
  weather?: WeatherData | null
}>()

const emit = defineEmits<{
  (e: 'location-changed', location: Location): void
}>()

const mapContainer = ref<HTMLElement | null>(null)
let map: any = null
let marker: any = null

onMounted(() => {
  if (!window.L) {
    console.error('Leaflet is not loaded')
    return
  }
  
  // Initialize map if container is ready
  if (mapContainer.value) {
    initMap()
  }
})

// keep map size in sync when window resizes or layout changes
const handleResize = () => {
  if (map && typeof map.invalidateSize === 'function') {
    setTimeout(() => map.invalidateSize(), 100)
  }
}

onUnmounted(() => {
  if (map) {
    map.remove()
    map = null
  }
  window.removeEventListener('resize', handleResize)
})

watch(() => props.location, (newLocation) => {
  if (newLocation && map) {
    updateMapLocation(newLocation.latitude, newLocation.longitude, newLocation.name)
  }
}, { deep: true })

const initMap = () => {
  // Create the map
  map = window.L.map(mapContainer.value).setView([48.8567, 2.3508], 5)
  
  // Add tile layer (OpenStreetMap)
  window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map)
  
  // Add click handler to map
  map.on('click', handleMapClick)
  
  // If we already have a location, center the map on it
  if (props.location) {
    updateMapLocation(props.location.latitude, props.location.longitude, props.location.name)
  }

  // ensure Leaflet computes correct tile sizes after render
  if (typeof map.invalidateSize === 'function') {
    setTimeout(() => map.invalidateSize(), 200)
  }

  // listen to window resize to keep map responsive
  window.addEventListener('resize', handleResize)
}

const updateMapLocation = (lat: number, lng: number, name: string) => {
  if (!map) return
  
  // Center map on location
  map.setView([lat, lng], 10)
  
  // Update or create marker
  if (marker) {
    marker.setLatLng([lat, lng]).setPopupContent(createPopupContent(name))
  } else {
    marker = window.L.marker([lat, lng])
      .addTo(map)
      .bindPopup(createPopupContent(name))
      .openPopup()
  }
}

// make sure map redraws after updating center/marker
watch(() => props.location, (newLocation) => {
  if (map && typeof map.invalidateSize === 'function') {
    setTimeout(() => map.invalidateSize(), 150)
  }
})

const createPopupContent = (name: string) => {
  let content = `<div><strong>${name}</strong></div>`
  
  if (props.weather) {
    content += `<div>${props.weather.temperature}°C</div>`
  }
  
  return content
}

const handleMapClick = async (event: any) => {
  const { lat, lng } = event.latlng
  
  // Create a reverse geocoding request to get location name
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
    )
    const data = await response.json()
    
    if (data.error) {
      console.error('Geocoding error:', data.error)
      return
    }
    
    const locationName = data.name || data.address.city || data.address.town || data.address.village || 'Unknown location'
    const country = data.address.country || ''
    
    const newLocation = {
      name: locationName,
      country: country,
      latitude: lat,
      longitude: lng
    }
    
    emit('location-changed', newLocation)
  } catch (error) {
    console.error('Error fetching location:', error)
  }
}
</script>

<template>
  <div class="map-component card">
    <div ref="mapContainer" class="map-container"></div>
    <div class="map-instructions">
      Click anywhere on the map to check weather at that location
    </div>
  </div>
</template>

<style scoped>
.map-component {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: fadeInUp 0.8s ease-out 0.2s both;
}

.map-container {
  flex-grow: 1;
  width: 100%;
  height: 100%;
  z-index: 1;
  border-radius: 16px 16px 0 0;
  overflow: hidden;
}


.map-instructions {
  padding: 1.2rem;
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.05) 0%, rgba(6, 182, 212, 0.03) 100%);
  color: var(--color-text);
  font-size: 0.95rem;
  font-weight: 500;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.9);
  border-radius: 0 0 16px 16px;
  backdrop-filter: blur(10px);
}

.map-instructions::before {
  content: "📍 ";
  margin-right: 0.5rem;
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

@media (max-width: 767px) {
  .map-component {
    min-height: 350px;
  }
  
  .map-container {
    min-height: 300px;
  }
  
  .map-instructions {
    padding: 1rem;
    font-size: 0.9rem;
  }
}

@media (min-width: 768px) {
  .map-container {
    min-height: 600px;
  }
}

@media (min-width: 1200px) {
  .map-container {
    min-height: 650px;
  }
}
</style>