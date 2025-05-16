import type { WeatherData } from "../types/Weather";
import type { ReactNode } from "react";

export function WeatherConditions({ weatherData, updated }: { weatherData: WeatherData, updated: ReactNode }) {

  return (
    <div className="current-weather">
      <h3>Current Weather</h3>
      <div className="weather-details">
        <p>Temperature: {weatherData.temperature}°C</p>
        <p>Humidity: {weatherData.humidity}%</p>
        <p>Wind Speed: {weatherData.windspeed} m/s</p>
        {updated}
      </div>
    </div>
  )
}
