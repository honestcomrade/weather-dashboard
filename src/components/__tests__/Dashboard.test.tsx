import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { Dashboard } from '../Dashboard'
import { SelectedCitiesProvider } from '../../context/SelectedCitiesContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const mockCities = [
  { id: '1', name: 'City 1', latitude: 0, longitude: 0 },
  { id: '2', name: 'City 2', latitude: 0, longitude: 0 },
  { id: '3', name: 'City 3', latitude: 0, longitude: 0 }
]

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

// Mock fetch
vi.spyOn(window, 'fetch').mockImplementation((url) => {
  // Return historical data for historical weather requests
  if (url.toString().includes('historical')) {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        data: [{
          temperature: 20,
          humidity: 50,
          windSpeed: 10,
          time: new Date().toISOString()
        }]
      })
    } as Response)
  }

  // Return current weather data for other requests
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      temperature: 20,
      humidity: 50,
      windSpeed: 10,
      time: new Date().toISOString()
    })
  } as Response)
})

// Mock the context
vi.mock('../../context/SelectedCitiesContext', async () => {
  const actual = await vi.importActual('../../context/SelectedCitiesContext')
  return {
    ...actual,
    useSelectedCities: () => ({
      cities: mockCities,
      removeCity: vi.fn(),
      reorderCities: vi.fn()
    })
  }
})

function renderWithProviders(ui: React.ReactElement) {
  return render(
    <QueryClientProvider client={queryClient}>
      <SelectedCitiesProvider>
        {ui}
      </SelectedCitiesProvider>
    </QueryClientProvider>
  )
}

describe('Dashboard', () => {
  it('renders all cities', async () => {
    renderWithProviders(<Dashboard />)

    await waitFor(() => {
      expect(screen.getByText('City 1')).toBeInTheDocument()
      expect(screen.getByText('City 2')).toBeInTheDocument()
      expect(screen.getByText('City 3')).toBeInTheDocument()
    })
  })

  it('renders reorder controls for each city', async () => {
    renderWithProviders(<Dashboard />)

    await waitFor(() => {
      const upButtons = screen.getAllByTitle('Move up')
      const downButtons = screen.getAllByTitle('Move down')

      expect(upButtons).toHaveLength(3)
      expect(downButtons).toHaveLength(3)
    })
  })

  it('disables up button for first city', async () => {
    renderWithProviders(<Dashboard />)

    await waitFor(() => {
      const upButtons = screen.getAllByTitle('Move up')
      expect(upButtons[0]).toBeDisabled()
    })
  })

  it('disables down button for last city', async () => {
    renderWithProviders(<Dashboard />)

    await waitFor(() => {
      const downButtons = screen.getAllByTitle('Move down')
      expect(downButtons[2]).toBeDisabled()
    })
  })
}) 