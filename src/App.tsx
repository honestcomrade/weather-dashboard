import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SelectedCitiesProvider } from './context/SelectedCitiesContext'
import { AddCity } from './components/AddCity'
import { Dashboard } from './components/Dashboard'
import './App.css'

const queryClient = new QueryClient()

function WeatherDashboard() {
  return (
    <div className="weather-dashboard">
      <header>
        <h1>Weather Report 2000</h1>
        <AddCity />
      </header>

      <main>
        <Dashboard />
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