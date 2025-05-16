import { useCities } from "../hooks/useStations";

export function CitySelect() {
  const { data: cities } = useCities()
  return <select>
    {cities?.map((city) => (
      <option key={city.id} value={city.id}>{city.name}</option>
    ))}
  </select>
}