import type { Forecast, WeatherContext } from "@/types/forecast";
export const forecast: Forecast = {
  location: "Delhi, India", target: "Maximum Temperature", issueTime: "2026-09-28T18:00:00+05:30", horizon: "24 hours",
  prediction: 31.5, lowerBound: 29.7, upperBound: 33.3, baseline: 30.8, observed: 32.1,
  model: "WeatherAI Random Forest", modelVersion: "v1.0"
};
export const weatherContext: WeatherContext = { temperature: 31.5, humidity: 61, windSpeed: 12, pressure: 1007 };
