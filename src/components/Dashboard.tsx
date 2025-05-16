import { useSelectedCities } from '../context/SelectedCitiesContext'
import { CityCardWithControls } from './CityCardWithControls'
import type { City } from '../types/City'

export function Dashboard() {
  const { cities, removeCity, reorderCities } = useSelectedCities()

  const handleMoveUp = (index: number) => {
    if (index > 0) {
      reorderCities(index, index - 1)
    }
  }

  const handleMoveDown = (index: number) => {
    if (index < cities.length - 1) {
      reorderCities(index, index + 1)
    }
  }

  return (
    <div className="dashboard">
      {cities.map((city: City, index: number) => (
        <CityCardWithControls
          key={city.id}
          city={city}
          index={index}
          onRemove={removeCity}
          onMoveUp={() => handleMoveUp(index)}
          onMoveDown={() => handleMoveDown(index)}
          isFirst={index === 0}
          isLast={index === cities.length - 1}
        />
      ))}
    </div>
  )
} 