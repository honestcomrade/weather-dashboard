import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { CityCard } from './CityCard'
import type { City } from '../types/City'

interface DraggableCityCardProps {
  city: City
  index: number
  onRemove: (cityId: string) => void
}

export function DraggableCityCard({ city, index, onRemove }: DraggableCityCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: city.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    position: 'relative' as const,
    touchAction: 'none'
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`draggable-card ${isDragging ? 'dragging' : ''}`}
      {...attributes}
      {...listeners}
    >
      <div className="drag-handle">☰</div>
      <CityCard city={city} onRemove={onRemove} />
    </div>
  )
} 