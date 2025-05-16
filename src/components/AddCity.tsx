import { useState } from 'react'
import { useCities } from '../hooks/useCities'
import type { City } from '../types/City'
import { useSelectedCities } from '../context/SelectedCitiesContext'
import { CitySelect } from './CitySelect'

export function AddCity() {
  const [selectedCityId, setSelectedCityId] = useState<string | null>(null)
  const { data: cities, isLoading } = useCities()
  const { addCity, cities: selectedCities } = useSelectedCities()

  const handleAddCity = () => {
    if (!selectedCityId || !cities) return
    const city = cities.find((s: City) => s.id === selectedCityId)
    if (!city) return
    addCity(city)
    setSelectedCityId(null)
  }

  if (isLoading) return <div>Loading stations...</div>

  return (
    <div className="add-city">
      <CitySelect onSelect={(id) => setSelectedCityId(id)} />
      <button
        onClick={handleAddCity}
        disabled={!selectedCityId || isLoading || selectedCities.some(city => city.id === selectedCityId)}
      >
        + Add City
      </button>
    </div>
  )
} 