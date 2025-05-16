import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CityCard } from '../CityCard'

const mockCity = {
  id: '1',
  name: 'Test City',
  latitude: 0,
  longitude: 0
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

// Mock fetch for both current and historical weather
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

function renderWithQueryClient(ui: React.ReactElement) {
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  )
}

describe('CityCard', () => {
  it('renders loading state initially', () => {
    renderWithQueryClient(
      <CityCard city={mockCity} onRemove={vi.fn()} />
    )
    expect(screen.getByText(/Loading weather data for Test City/)).toBeInTheDocument()
  })

  it('calls onRemove when remove button is clicked', async () => {
    const onRemove = vi.fn()
    renderWithQueryClient(
      <CityCard city={mockCity} onRemove={onRemove} />
    )

    // Wait for loading to complete and find the remove button
    const removeButton = await screen.findByText('Remove')
    fireEvent.click(removeButton)
    expect(onRemove).toHaveBeenCalledWith(mockCity.id)
  })

  it('renders error state when weather data fetch fails', async () => {
    // Mock the query to fail
    vi.spyOn(window, 'fetch').mockRejectedValueOnce(new Error('Failed to fetch'))

    renderWithQueryClient(
      <CityCard city={mockCity} onRemove={vi.fn()} />
    )

    expect(await screen.findByText(/Error loading weather data for Test City/)).toBeInTheDocument()
  })
}) 