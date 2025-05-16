import { useSelectedCities } from '../context/SelectedCitiesContext'
import { CityCard } from './CityCard'

export function SelectedCities() {
  const { cities, removeCity } = useSelectedCities()

  return (
    <>
      {cities.map((city) => (
        <CityCard key={city.id} city={city} onRemove={removeCity} />
      ))}
    </>
  )
}