export interface WeatherData {
  time: string
  time_local: string
  temperature: number
  dewpoint: number
  humidity: number
  precipitation: number
  precipitation_3: number | null
  precipitation_6: number | null
  snowdepth: number | null
  windspeed: number
  peakgust: number
  winddirection: number
  pressure: number
  condition: number
} 