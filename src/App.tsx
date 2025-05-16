import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CitySelect } from './components/CitySelect'
import './App.css'

const queryClient = new QueryClient()

export function App() {


  return (
    <QueryClientProvider client={queryClient}>
      <div className="weather-dashboard">
        <header>
          <h1>Weather Report 2000</h1>
          <CitySelect />
        </header>
        <main>

        </main>
      </div>
    </QueryClientProvider>
  )
}