import { forecastHistory } from "@/data/mockHistory";
import { modelMetadata } from "@/data/mockMetadata";
import type { Forecast, ForecastHistory, WeatherContext } from "@/types/forecast";

export interface ForecastScenario extends Forecast {
  id: string;
  uncertainty: number;
  absoluteError: number;
  historicalSeries: ForecastHistory[];
  weatherContext: WeatherContext;
}

const dateSpecs = [
  { day: 14, forecast: 34.2, observed: 29.8, baseline: 31.2, uncertainty: 2.1, humidity: 54, wind: 9, pressure: 1009 },
  { day: 19, forecast: 28.7, observed: 32.1, baseline: 30.4, uncertainty: 2.3, humidity: 68, wind: 15, pressure: 1004 },
  { day: 24, forecast: 31.2, observed: 34.0, baseline: 30.6, uncertainty: 1.7, humidity: 59, wind: 11, pressure: 1008 },
  { day: 28, forecast: 31.5, observed: 32.1, baseline: 30.8, uncertainty: 1.8, humidity: 61, wind: 12, pressure: 1007 },
] as const;

const shiftSeries = (offset: number, day: number): ForecastHistory[] => forecastHistory
  .filter((row) => Number(row.date.slice(4)) <= day)
  .map((row) => ({
    ...row,
    forecast: Number((row.forecast + offset).toFixed(1)),
    actual: Number((row.actual + offset).toFixed(1)),
    baseline: Number((row.baseline + offset).toFixed(1)),
    lowerBound: Number(((row.lowerBound ?? row.forecast - 1.5) + offset).toFixed(1)),
    upperBound: Number(((row.upperBound ?? row.forecast + 1.5) + offset).toFixed(1)),
  }));

export const forecastScenarios: ForecastScenario[] = dateSpecs.map((spec) => {
  const date = `2025-09-${String(spec.day).padStart(2, "0")}`;
  const uncertainty = spec.uncertainty;
  const prediction = spec.forecast;
  return {
    id: `delhi-max-${date}`,
    location: "Delhi, India",
    target: "Next-day maximum temperature",
    issueTime: `${date}T18:00:00+05:30`,
    horizon: "24 hours",
    prediction,
    lowerBound: Number((prediction - uncertainty).toFixed(1)),
    upperBound: Number((prediction + uncertainty).toFixed(1)),
    uncertainty,
    baseline: spec.baseline,
    observed: spec.observed,
    absoluteError: Number(Math.abs(prediction - spec.observed).toFixed(1)),
    model: modelMetadata.algorithm,
    modelVersion: modelMetadata.version,
    historicalSeries: [...shiftSeries(Number((prediction - 31.5).toFixed(1)), spec.day - 1), {
      date: `Sep ${spec.day}`,
      forecast: prediction,
      actual: spec.observed,
      baseline: spec.baseline,
      lowerBound: Number((prediction - uncertainty).toFixed(1)),
      upperBound: Number((prediction + uncertainty).toFixed(1)),
    }],
    weatherContext: { temperature: prediction, humidity: spec.humidity, windSpeed: spec.wind, pressure: spec.pressure },
  };
});

export const defaultForecastScenario = forecastScenarios[forecastScenarios.length - 1];

export function getForecastScenario(selection: { location: string; target: string; issueDate: string; horizon: string }) {
  return forecastScenarios.find((scenario) => scenario.location === selection.location && scenario.target === selection.target && scenario.issueTime.slice(0, 10) === selection.issueDate && scenario.horizon === selection.horizon);
}
export const getAvailableLocations = () => Array.from(new Set(forecastScenarios.map((s) => s.location)));
export const getAvailableTargets = (location = "Delhi, India") => Array.from(new Set(forecastScenarios.filter((s) => s.location === location).map((s) => s.target)));
export const getAvailableHorizons = (location = "Delhi, India", target = "Next-day maximum temperature") => Array.from(new Set(forecastScenarios.filter((s) => s.location === location && s.target === target).map((s) => s.horizon)));
export const getAvailableIssueDates = (location = "Delhi, India", target = "Next-day maximum temperature", horizon = "24 hours") => forecastScenarios.filter((s) => s.location === location && s.target === target && s.horizon === horizon).map((s) => s.issueTime.slice(0, 10));
