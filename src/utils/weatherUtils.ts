/**
 * Get SVG icon for weather code
 */
export function getWeatherIcon(code: number): string {
  // Clear
  if (code === 0) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
      <circle cx="12" cy="12" r="5" stroke="none"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>`
  }
  
  // Cloudy
  if (code >= 1 && code <= 3) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
    </svg>`
  }
  
  // Fog
  if (code >= 45 && code <= 48) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
      <line x1="3" y1="10" x2="21" y2="10"></line>
      <line x1="3" y1="14" x2="21" y2="14"></line>
      <line x1="5" y1="6" x2="19" y2="6"></line>
      <line x1="5" y1="18" x2="19" y2="18"></line>
    </svg>`
  }
  
  // Rain
  if ((code >= 51 && code <= 55) || (code >= 80 && code <= 82)) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
      <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path>
      <line x1="8" y1="19" x2="8" y2="21"></line>
      <line x1="12" y1="19" x2="12" y2="21"></line>
      <line x1="16" y1="19" x2="16" y2="21"></line>
    </svg>`
  }
  
  // Snow
  if (code >= 71 && code <= 77) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
      <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"></path>
      <line x1="8" y1="16" x2="8.01" y2="16"></line>
      <line x1="8" y1="20" x2="8.01" y2="20"></line>
      <line x1="12" y1="18" x2="12.01" y2="18"></line>
      <line x1="12" y1="22" x2="12.01" y2="22"></line>
      <line x1="16" y1="16" x2="16.01" y2="16"></line>
      <line x1="16" y1="20" x2="16.01" y2="20"></line>
    </svg>`
  }
  
  // Thunderstorm
  if (code >= 95 && code <= 99) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
      <path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"></path>
      <polyline points="13 11 9 17 15 17 11 23"></polyline>
    </svg>`
  }
  
  // Default icon (partly cloudy)
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
    <path d="M12 2v2"></path>
    <path d="M12 20v2"></path>
    <path d="M4.93 4.93l1.41 1.41"></path>
    <path d="M17.66 17.66l1.41 1.41"></path>
    <path d="M2 12h2"></path>
    <path d="M20 12h2"></path>
    <path d="M6.34 17.66l-1.41 1.41"></path>
    <path d="M19.07 4.93l-1.41 1.41"></path>
    <path d="M17.66 6.34A6 6 0 0 1 18 16.46H7a5 5 0 1 1-1-9.9 6 6 0 0 1 11.66 0z"></path>
  </svg>`
}

/**
 * Format temperature with degree symbol
 */
export function formatTemperature(temp: number): string {
  return `${Math.round(temp)}°`
}

/**
 * Get weather description based on code
 */
export function getWeatherDescription(code: number): string {
  // Clear
  if (code === 0) return 'Clear sky'
  
  // Cloudy
  if (code === 1) return 'Mainly clear'
  if (code === 2) return 'Partly cloudy'
  if (code === 3) return 'Overcast'
  
  // Fog
  if (code >= 45 && code <= 48) return 'Fog'
  
  // Drizzle
  if (code >= 51 && code <= 55) return 'Drizzle'
  
  // Freezing Drizzle
  if (code >= 56 && code <= 57) return 'Freezing drizzle'
  
  // Rain
  if (code >= 61 && code <= 65) return 'Rain'
  if (code === 66 || code === 67) return 'Freezing rain'
  
  // Snow
  if (code >= 71 && code <= 77) return 'Snow'
  
  // Rain showers
  if (code >= 80 && code <= 82) return 'Rain showers'
  
  // Snow showers
  if (code >= 85 && code <= 86) return 'Snow showers'
  
  // Thunderstorm
  if (code >= 95 && code <= 99) return 'Thunderstorm'
  
  return 'Unknown'
}