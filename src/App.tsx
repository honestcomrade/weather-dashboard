import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SelectedCitiesProvider } from './context/SelectedCitiesContext'
import { AddCity } from './components/AddCity'
import { useSelectedCities } from './context/SelectedCitiesContext'
import './App.css'

const queryClient = new QueryClient()

function WeatherDashboard() {
  const { cities, removeCity } = useSelectedCities()

  return (
    <div className="weather-dashboard">
      <header>
        <h1>Weather Report 2000</h1>
        <AddCity />
      </header>

      <main>
        {cities.map((city) => (
          <div key={city.id} className="card">
            <div className="city-header">
              <h2>{city.name}</h2>
              <button onClick={() => removeCity(city.id)}>Remove</button>
            </div>
            {/* Weather data will be added here */}
          </div>
        ))}
      </main>
    </div>
  )
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SelectedCitiesProvider>
        <WeatherDashboard />
      </SelectedCitiesProvider>
    </QueryClientProvider>
  )
}