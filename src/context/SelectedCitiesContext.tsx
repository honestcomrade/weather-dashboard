import { createContext, useContext, useReducer, type ReactNode } from 'react'
import type { City } from '../types/City'

interface SelectedCitiesState {
  cities: City[]
}

type SelectedCitiesAction =
  | { type: 'ADD_CITY'; payload: City }
  | { type: 'REMOVE_CITY'; payload: string }
  | { type: 'REORDER_CITIES'; payload: { oldIndex: number; newIndex: number } }

const STORAGE_KEY = 'selectedCities'

const initialState: SelectedCitiesState = {
  cities: JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
}

function selectedCitiesReducer(state: SelectedCitiesState, action: SelectedCitiesAction): SelectedCitiesState {
  let newState: SelectedCitiesState

  switch (action.type) {
    case 'ADD_CITY':
      // Check if city already exists
      if (state.cities.some(city => city.id === action.payload.id)) {
        return state // Return unchanged state if city already exists
      }
      newState = {
        ...state,
        cities: [...state.cities, action.payload]
      }
      break
    case 'REMOVE_CITY':
      newState = {
        ...state,
        cities: state.cities.filter(city => city.id !== action.payload)
      }
      break
    case 'REORDER_CITIES':
      const { oldIndex, newIndex } = action.payload
      const newCities = [...state.cities]
      const [movedCity] = newCities.splice(oldIndex, 1)
      newCities.splice(newIndex, 0, movedCity)
      newState = {
        ...state,
        cities: newCities
      }
      break
    default:
      return state
  }

  // Save to localStorage after each state change
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newState.cities))
  return newState
}

interface SelectedCitiesContextType extends SelectedCitiesState {
  addCity: (city: City) => void
  removeCity: (cityId: string) => void
  reorderCities: (oldIndex: number, newIndex: number) => void
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

  const reorderCities = (oldIndex: number, newIndex: number) => {
    dispatch({ type: 'REORDER_CITIES', payload: { oldIndex, newIndex } })
  }

  return (
    <SelectedCitiesContext.Provider value={{ ...state, addCity, removeCity, reorderCities }}>
      {children}
    </SelectedCitiesContext.Provider>
  )
}

export function useSelectedCities() {
  const context = useContext(SelectedCitiesContext)
  if (context === undefined) {
    throw new Error('useSelectedCities must be used within a SelectedCitiesProvider')
  }
  return context
} 