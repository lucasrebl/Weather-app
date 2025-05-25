import axios from 'axios'
import type { Location } from '../types/weather'

/**
 * Search for locations using the Nominatim API (OpenStreetMap)
 */
export async function searchLocations(query: string): Promise<Location[]> {
  if (!query || query.length < 2) return []

  try {
    // Use Nominatim for geocoding
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: query,
        format: 'json',
        limit: 5,
        addressdetails: 1
      },
      headers: {
        'Accept-Language': 'en-US,en'
      }
    })

    return response.data.map((item: any) => ({
      name: item.name || item.display_name.split(',')[0],
      country: item.address.country || '',
      latitude: parseFloat(item.lat),
      longitude: parseFloat(item.lon)
    }))
  } catch (error) {
    console.error('Error searching locations:', error)
    throw new Error('Failed to search locations')
  }
}