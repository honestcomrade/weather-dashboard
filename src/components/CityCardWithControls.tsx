import { CityCard } from './CityCard'
import type { City } from '../types/City'

interface CityCardWithControlsProps {
  city: City
  index: number
  onRemove: (cityId: string) => void
  onMoveUp: () => void
  onMoveDown: () => void
  isFirst: boolean
  isLast: boolean
}

export function CityCardWithControls({
  city,
  onRemove,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast
}: CityCardWithControlsProps) {
  return (
    <div className="city-card-container">
      <div className="reorder-controls">
        <button
          onClick={onMoveUp}
          disabled={isFirst}
          className="reorder-button"
          title="Move up"
        >
          ↑
        </button>
        <button
          onClick={onMoveDown}
          disabled={isLast}
          className="reorder-button"
          title="Move down"
        >
          ↓
        </button>
      </div>
      <CityCard city={city} onRemove={onRemove} />
    </div>
  )
} 