import { DndContext, closestCenter, DragOverlay } from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useSelectedCities } from '../context/SelectedCitiesContext'
import { DraggableCityCard } from './DraggableCityCard'
import { useState } from 'react'

export function Dashboard() {
  const { cities, removeCity, reorderCities } = useSelectedCities()
  const [activeId, setActiveId] = useState<string | null>(null)

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)

    if (!over || active.id === over.id) return

    const oldIndex = cities.findIndex(city => city.id === active.id)
    const newIndex = cities.findIndex(city => city.id === over.id)
    reorderCities(oldIndex, newIndex)
  }

  return (
    <div className="dashboard">
      <DndContext
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={cities.map(city => city.id)}
          strategy={verticalListSortingStrategy}
        >
          {cities.map((city, index) => (
            <DraggableCityCard
              key={city.id}
              city={city}
              index={index}
              onRemove={removeCity}
            />
          ))}
        </SortableContext>
        <DragOverlay>
          {activeId ? (
            <div className="draggable-card dragging">
              <div className="drag-handle">☰</div>
              <div className="city-card">
                {cities.find(city => city.id === activeId)?.name}
              </div>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  )
} 