import type { Forecast, WeatherContext } from "@/types/forecast";
import { modelMetadata } from "@/data/mockMetadata";
export const forecast: Forecast = {
  location: "Delhi, India", target: "Maximum Temperature", issueTime: "2026-09-28T18:00:00+05:30", horizon: "24 hours",
  prediction: 31.5, lowerBound: 29.7, upperBound: 33.3, baseline: 30.8, observed: 32.1,
  model: modelMetadata.algorithm, modelVersion: modelMetadata.version
};
export const weatherContext: WeatherContext = { temperature: forecast.prediction, humidity: 61, windSpeed: 12, pressure: 1007 };
