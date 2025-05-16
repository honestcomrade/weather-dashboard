import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CityCardWithControls } from '../CityCardWithControls'

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
vi.spyOn(window, 'fetch').mockImplementation(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      temperature: 20,
      humidity: 50,
      windSpeed: 10,
      time: new Date().toISOString()
    })
  } as Response)
)

function renderWithQueryClient(ui: React.ReactElement) {
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  )
}

describe('CityCardWithControls', () => {
  it('renders city name', async () => {
    renderWithQueryClient(
      <CityCardWithControls
        city={mockCity}
        index={0}
        onRemove={vi.fn()}
        onMoveUp={vi.fn()}
        onMoveDown={vi.fn()}
        isFirst={false}
        isLast={false}
      />
    )
    expect(await screen.findByText('Test City')).toBeInTheDocument()
  })

  it('disables up button when isFirst is true', async () => {
    renderWithQueryClient(
      <CityCardWithControls
        city={mockCity}
        index={0}
        onRemove={vi.fn()}
        onMoveUp={vi.fn()}
        onMoveDown={vi.fn()}
        isFirst={true}
        isLast={false}
      />
    )
    const upButton = await screen.findByTitle('Move up')
    expect(upButton).toBeDisabled()
  })

  it('disables down button when isLast is true', async () => {
    renderWithQueryClient(
      <CityCardWithControls
        city={mockCity}
        index={0}
        onRemove={vi.fn()}
        onMoveUp={vi.fn()}
        onMoveDown={vi.fn()}
        isFirst={false}
        isLast={true}
      />
    )
    const downButton = await screen.findByTitle('Move down')
    expect(downButton).toBeDisabled()
  })

  it('calls onMoveUp when up button is clicked', async () => {
    const onMoveUp = vi.fn()
    renderWithQueryClient(
      <CityCardWithControls
        city={mockCity}
        index={0}
        onRemove={vi.fn()}
        onMoveUp={onMoveUp}
        onMoveDown={vi.fn()}
        isFirst={false}
        isLast={false}
      />
    )
    const upButton = await screen.findByTitle('Move up')
    fireEvent.click(upButton)
    expect(onMoveUp).toHaveBeenCalledTimes(1)
  })

  it('calls onMoveDown when down button is clicked', async () => {
    const onMoveDown = vi.fn()
    renderWithQueryClient(
      <CityCardWithControls
        city={mockCity}
        index={0}
        onRemove={vi.fn()}
        onMoveUp={vi.fn()}
        onMoveDown={onMoveDown}
        isFirst={false}
        isLast={false}
      />
    )
    const downButton = await screen.findByTitle('Move down')
    fireEvent.click(downButton)
    expect(onMoveDown).toHaveBeenCalledTimes(1)
  })
}) 