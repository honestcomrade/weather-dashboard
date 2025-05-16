import { format, startOfDay } from 'date-fns'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import type { WeatherData } from '../types/Weather'

interface WeatherChartProps {
  data: WeatherData[]
}

export function WeatherChart({ data }: WeatherChartProps) {
  // Group data by day
  const groupedByDay = data.reduce((acc: Record<string, WeatherData[]>, weather) => {
    const date = startOfDay(new Date(weather.time)).toISOString()
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(weather)
    return acc
  }, {})

  // Calculate daily averages
  const chartData = Object.entries(groupedByDay)
    .map(([date, readings]) => {
      const sum = readings.reduce((acc, reading) => ({
        temperature: acc.temperature + reading.temperature,
        humidity: acc.humidity + reading.humidity,
        windspeed: acc.windspeed + reading.windspeed
      }), { temperature: 0, humidity: 0, windspeed: 0 })

      return {
        time: new Date(date),
        temperature: Number((sum.temperature / readings.length).toFixed(1)),
        humidity: Number((sum.humidity / readings.length).toFixed(1)),
        windspeed: Number((sum.windspeed / readings.length).toFixed(1))
      }
    })
    .sort((a, b) => a.time.getTime() - b.time.getTime())

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData} margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
        <XAxis
          dataKey="time"
          tickFormatter={(date) => format(date, 'MMM d')}
          type="category"
          interval={0}
          height={40}
          tick={{ fontSize: 11 }}
          angle={-45}
          textAnchor="end"
        />
        <YAxis
          yAxisId="left"
          width={40}
          label={{
            value: 'Temperature (°C) / Humidity (%)',
            angle: -90,
            position: 'insideLeft',
            style: { fontSize: 11 }
          }}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          width={40}
          label={{
            value: 'Wind Speed (m/s)',
            angle: 90,
            position: 'insideRight',
            style: { fontSize: 11 }
          }}
        />
        <Tooltip
          labelFormatter={(date) => format(date, 'MMM d, yyyy')}
        />
        <Legend />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="temperature"
          stroke="#8884d8"
          name="Temperature (°C)"
          dot={false}
        />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="humidity"
          stroke="#82ca9d"
          name="Humidity (%)"
          dot={false}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="windspeed"
          stroke="#ffc658"
          name="Wind Speed (m/s)"
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
} 