import { useQuery } from '@tanstack/react-query'
import type { City } from '../types/City'


async function fetchCities(): Promise<City[]> {
  const response = await fetch('https://bh-weather-data.s3.amazonaws.com/stations.json', {
    headers: {
      'Origin': window.location.origin
    }
  })
  if (!response.ok) throw new Error('Failed to fetch stations')
  return response.json()
}

export function useCities() {
  return useQuery({
    queryKey: ['cities'],
    queryFn: fetchCities,
  })
} 