export interface Forecast {
  location: string; target: string; issueTime: string; horizon: string;
  prediction: number; lowerBound: number; upperBound: number; baseline: number;
  observed?: number; model: string; modelVersion: string;
}
export interface ForecastHistory { date: string; forecast: number; actual?: number; baseline: number; lowerBound?: number; upperBound?: number }
export interface WeatherContext { temperature: number; humidity: number; windSpeed: number; pressure: number }
