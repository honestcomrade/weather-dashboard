import { useCities } from '../hooks/useCities'
import type { City } from '../types/City'

interface CitySelectProps {
  onSelect: (id: string) => void
}

export function CitySelect({ onSelect }: CitySelectProps) {
  const { data: cities, isLoading } = useCities()

  if (isLoading) return <div>Loading cities...</div>

  return (
    <select
      onChange={(e) => onSelect(e.target.value)}
      defaultValue=""
      className="city-select"
    >
      <option value="" disabled>
        Select a city to add...
      </option>
      {cities?.map((city: City) => (
        <option key={city.id} value={city.id}>
          {city.name}
        </option>
      ))}
    </select>
  )
}