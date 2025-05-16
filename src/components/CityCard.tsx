import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'

import { fetchWeatherData } from '../services/WeatherService'
import type { City } from '../types/City'
import type { WeatherData } from '../types/Weather'


interface CityCardProps {
  city: City
  onRemove: (city: string) => void
}

export function CityCard({ city, onRemove }: CityCardProps) {
  const { data: weatherData, isLoading, error } = useQuery<WeatherData>({
    queryKey: ['weather', city],
    queryFn: () => fetchWeatherData(city.id)
  })

  if (isLoading) return <div className="city-card">Loading weather data for {city.name}...</div>
  if (error) return <div className="city-card">Error loading weather data for {city.name}</div>
  if (!weatherData) return null

  return (
    <div className="city-card">
      <div className="city-card-header">
        <h2>{city.name}</h2>
        <button onClick={() => onRemove(city.id)}>Remove</button>
      </div>
      <div className="city-card-content">
        <div className="current-weather">
          <h3>Current Weather</h3>
          <div className="weather-details">
            <p>Temperature: {weatherData.temperature}°C</p>
            <p>Humidity: {weatherData.humidity}%</p>
            <p>Wind Speed: {weatherData.windspeed} m/s</p>
            <p>Last Updated: {format(new Date(weatherData.time), 'MMM d, yyyy HH:mm')}</p>
          </div>
        </div>
        <div className="historical-data">
          <h3>Historical Data</h3>
          <div className="chart-container">
          </div>
        </div>
      </div>
    </div>
  )
} 