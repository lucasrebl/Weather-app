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
  max-width: 550px;
  margin: 0 auto;
  animation: fadeInDown 0.6s ease-out;
}

.search-container {
  position: relative;
  width: 100%;
}

.search-input {
  width: 100%;
  padding: 1rem 1.2rem 1rem 3.2rem;
  border-radius: 14px;
  border: 2px solid var(--color-border);
  font-size: 1rem;
  font-weight: 500;
  background: white;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

.search-input::placeholder {
  color: var(--color-text-light);
}

.search-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 8px 25px rgba(14, 165, 233, 0.25);
  outline: none;
  background: white;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-light);
  width: 1.3rem;
  height: 1.3rem;
  pointer-events: none;
}

.search-loader {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.2rem;
  height: 1.2rem;
  border: 2.5px solid rgba(14, 165, 233, 0.2);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 1s infinite linear;
}

.search-results {
  position: absolute;
  top: calc(100% + 0.8rem);
  left: 0;
  right: 0;
  width: 100%;
  background: white;
  border-radius: 14px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.95);
  z-index: 20;
  max-height: 350px;
  overflow-y: auto;
  animation: slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.search-results::-webkit-scrollbar {
  width: 6px;
}

.search-results::-webkit-scrollbar-track {
  background: transparent;
}

.search-results::-webkit-scrollbar-thumb {
  background: rgba(14, 165, 233, 0.2);
  border-radius: 3px;
}

.search-results::-webkit-scrollbar-thumb:hover {
  background: rgba(14, 165, 233, 0.4);
}

.search-results ul {
  list-style: none;
  padding: 0.5rem 0;
  margin: 0;
}

.search-result-item {
  padding: 1rem 1.2rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
}

.search-result-item:hover {
  background: linear-gradient(90deg, rgba(14, 165, 233, 0.08) 0%, rgba(6, 182, 212, 0.04) 100%);
  border-left-color: var(--color-primary);
  padding-left: 1.4rem;
}

.location-name {
  font-weight: 600;
  color: var(--color-text);
}

.location-country {
  color: var(--color-text-light);
  font-size: 0.85rem;
  font-weight: 500;
  background: rgba(14, 165, 233, 0.1);
  padding: 0.3rem 0.7rem;
  border-radius: 6px;
}

.search-error {
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  color: var(--color-error);
  font-size: 0.9rem;
  text-align: center;
  background: rgba(239, 68, 68, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(239, 68, 68, 0.2);
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes spin {
  to {
    transform: translateY(-50%) rotate(360deg);
  }
}

@media (max-width: 768px) {
  .city-search {
    max-width: 100%;
  }
  
  .search-input {
    font-size: 1rem;
    padding: 0.9rem 1rem 0.9rem 2.8rem;
  }
}
</style>