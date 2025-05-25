<script setup lang="ts">
import { ref, watch } from 'vue'
import { searchLocations } from '../services/geocodingService'
import type { Location } from '../types/weather'

const emit = defineEmits<{
  (e: 'location-selected', location: Location): void
}>()

const searchQuery = ref('')
const searchResults = ref<Location[]>([])
const searching = ref(false)
const searchError = ref<string | null>(null)

// Debounced search
let debounceTimer: number | null = null

watch(searchQuery, async (newQuery) => {
  if (debounceTimer) clearTimeout(debounceTimer)
  
  if (newQuery.length < 2) {
    searchResults.value = []
    return
  }
  
  debounceTimer = setTimeout(async () => {
    searching.value = true
    searchError.value = null
    
    try {
      searchResults.value = await searchLocations(newQuery)
    } catch (err) {
      console.error('Search error:', err)
      searchError.value = 'Failed to search locations. Please try again.'
      searchResults.value = []
    } finally {
      searching.value = false
    }
  }, 500) as unknown as number
})

const selectLocation = (location: Location) => {
  emit('location-selected', location)
  searchQuery.value = location.name
  searchResults.value = []
}
</script>

<template>
  <div class="city-search">
    <div class="search-container">
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="Search for a city..." 
        class="search-input"
        aria-label="Search for a city"
      />
      <div class="search-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>
      <div v-if="searching" class="search-loader"></div>
    </div>
    
    <div v-if="searchResults.length > 0" class="search-results">
      <ul>
        <li 
          v-for="(location, index) in searchResults" 
          :key="index"
          @click="selectLocation(location)"
          class="search-result-item"
        >
          <span class="location-name">{{ location.name }}</span>
          <span class="location-country">{{ location.country }}</span>
        </li>
      </ul>
    </div>
    
    <div v-if="searchError" class="search-error">
      {{ searchError }}
    </div>
  </div>
</template>

<style scoped>
.city-search {
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}

.search-container {
  position: relative;
  width: 100%;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border-radius: 12px;
  border: 1px solid var(--color-border);
  font-size: 1rem;
  transition: all 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.search-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(52, 144, 220, 0.25);
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-light);
  width: 1.25rem;
  height: 1.25rem;
}

.search-loader {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 1s infinite linear;
}

.search-results {
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  width: 100%;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 10;
  max-height: 300px;
  overflow-y: auto;
}

.search-results ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.search-result-item {
  padding: 0.75rem 1rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  transition: background-color 0.2s;
}

.search-result-item:hover {
  background-color: rgba(52, 144, 220, 0.1);
}

.location-name {
  font-weight: 500;
}

.location-country {
  color: var(--color-text-light);
  font-size: 0.875rem;
}

.search-error {
  margin-top: 0.5rem;
  padding: 0.5rem;
  color: var(--color-error);
  font-size: 0.875rem;
  text-align: center;
}

@keyframes spin {
  to {
    transform: translateY(-50%) rotate(360deg);
  }
}

@media (max-width: 640px) {
  .search-input {
    font-size: 0.875rem;
  }
}
</style>