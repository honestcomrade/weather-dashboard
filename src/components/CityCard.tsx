import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'

import { fetchCurrentWeatherData, fetchHistoricalWeatherData } from '../services/WeatherService'
import type { City } from '../types/City'
import type { WeatherData } from '../types/Weather'
import { WeatherConditions } from './WeatherConditions'

interface CityCardProps {
  city: City
  onRemove: (city: string) => void
}

export function CityCard({ city, onRemove }: CityCardProps) {
  const { data: weatherData, isLoading, error } = useQuery<WeatherData>({
    queryKey: ['weather', city],
    queryFn: () => fetchCurrentWeatherData(city.id)
  })

  const { data: historicalWeatherData, isLoading: historicalWeatherLoading, error: historicalWeatherError } = useQuery<WeatherData>({
    queryKey: ['historicalWeather', city],
    queryFn: () => fetchHistoricalWeatherData(city.id)
  })

  if (isLoading) return <div className="city-card">Loading weather data for {city.name}...</div>
  if (error) return <div className="city-card">Error loading weather data for {city.name}</div>
  if (!weatherData) return null

  const currentWeather = <WeatherConditions weatherData={weatherData} updated={<p>Last Updated: {format(new Date(weatherData.time), 'MMM d, yyyy HH:mm')}</p>} />

  return (
    <div className="city-card">
      <div className="city-card-header">
        <h2>{city.name}</h2>
        <button onClick={() => onRemove(city.id)}>Remove</button>
      </div>
      <div className="city-card-content">
        <div className="current-weather">
          {currentWeather}
        </div>
        <div className="historical-data">
          <h3>Historical Data</h3>
          <div className="chart-container">
            {historicalWeatherLoading && (
              <p>Loading historical data for {city.name}...</p>
            )}
            {historicalWeatherError && (
              <p>Error loading historical data for {city.name}</p>
            )}
            {historicalWeatherData && (
              <pre>{JSON.stringify(historicalWeatherData, null, 2)}</pre>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 