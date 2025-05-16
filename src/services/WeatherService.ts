import type { WeatherData } from '../types/Weather'

export async function fetchCurrentWeatherData(cityId: string): Promise<WeatherData> {
  const response = await fetch(`https://bh-weather-data.s3.amazonaws.com/current/${cityId}.json`, {
    headers: {
      'Origin': window.location.origin
    }
  })
  if (!response.ok) throw new Error(`Weather data not found for ${cityId}`)
  return await response.json()
}

export async function fetchHistoricalWeatherData(cityId: string): Promise<WeatherData[]> {
  const response = await fetch(`https://bh-weather-data.s3.amazonaws.com/historical/${cityId}.json`, {
    headers: {
      'Origin': window.location.origin
    }
  })
  if (!response.ok) throw new Error(`Weather data not found for ${cityId}`)
  const result = await response.json();
  return result.data;
}

