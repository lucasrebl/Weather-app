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

onUnmounted(() => {
  if (map) {
    map.remove()
    map = null
  }
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
  min-height: 400px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.map-container {
  flex-grow: 1;
  width: 100%;
  height: 100%;
  min-height: 350px;
  z-index: 1; /* Ensure map displays correctly */
}

.map-instructions {
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.9);
  color: var(--color-text);
  font-size: 0.875rem;
  text-align: center;
  border-top: 1px solid var(--color-border);
}

@media (max-width: 767px) {
  .map-component {
    min-height: 300px;
  }
  
  .map-container {
    min-height: 250px;
  }
}
</style>