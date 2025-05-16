import type { WeatherData } from '../types/Weather'

export async function fetchWeatherData(cityId: string): Promise<WeatherData> {
  const data = await fetch(`https://bh-weather-data.s3.amazonaws.com/current/${cityId}.json`,
    {
      headers: {
        'Origin': window.location.origin
      }
    }
  )
  if (!data.ok) throw new Error(`Weather data not found for ${cityId}`)
  return await data.json()
} 