import { createContext, useContext, useReducer, type ReactNode } from 'react'
import type { City } from '../types/City'
interface SelectedCitiesState {
  cities: City[]
}

type SelectedCitiesAction =
  | { type: 'ADD_CITY'; payload: City }
  | { type: 'REMOVE_CITY'; payload: string }

const initialState: SelectedCitiesState = {
  cities: []
}

function selectedCitiesReducer(state: SelectedCitiesState, action: SelectedCitiesAction): SelectedCitiesState {
  switch (action.type) {
    case 'ADD_CITY':
      return {
        ...state,
        cities: [...state.cities, action.payload]
      }
    case 'REMOVE_CITY':
      return {
        ...state,
        cities: state.cities.filter(city => city.id !== action.payload)
      }
    default:
      return state
  }
}

interface SelectedCitiesContextType extends SelectedCitiesState {
  addCity: (city: City) => void
  removeCity: (cityId: string) => void
}

const SelectedCitiesContext = createContext<SelectedCitiesContextType | undefined>(undefined)

export function SelectedCitiesProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(selectedCitiesReducer, initialState)

  const addCity = (city: City) => {
    dispatch({ type: 'ADD_CITY', payload: city })
  }

  const removeCity = (cityId: string) => {
    dispatch({ type: 'REMOVE_CITY', payload: cityId })
  }

  return (
    <SelectedCitiesContext.Provider value={{ ...state, addCity, removeCity }}>
      {children}
    </SelectedCitiesContext.Provider>
  )
}

export function useSelectedCities() {
  const context = useContext(SelectedCitiesContext)
  if (context === undefined) {
    throw new Error('useCities must be used within a CitiesProvider')
  }
  return context
} 