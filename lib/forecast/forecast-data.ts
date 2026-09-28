import { modelMetadata } from "@/data/mockMetadata";
import type { Forecast, ForecastHistory, WeatherContext } from "@/types/forecast";

export const PROTOTYPE_REFERENCE_DATE = "2026-09-28";
const ISSUE_TIME = `${PROTOTYPE_REFERENCE_DATE}T18:00:00+05:30`;

export interface ForecastScenario extends Omit<Forecast, "observed"> {
  id: string;
  issueDate: string;
  targetDate: string;
  horizonHours: number;
  uncertainty: number;
  chartData: ForecastHistory[];
  weatherContext: WeatherContext;
}

type FutureSpec = {
  targetDate: string;
  horizonHours: number;
  prediction: number;
  uncertainty: number;
  baseline: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
};

const futureSpecs: FutureSpec[] = [
  { targetDate: "2026-09-29", horizonHours: 24, prediction: 31.5, uncertainty: 1.8, baseline: 30.8, humidity: 61, windSpeed: 12, pressure: 1007 },
  { targetDate: "2026-09-30", horizonHours: 48, prediction: 32.1, uncertainty: 1.9, baseline: 31.0, humidity: 58, windSpeed: 10, pressure: 1008 },
  { targetDate: "2026-10-01", horizonHours: 72, prediction: 30.8, uncertainty: 1.9, baseline: 31.2, humidity: 65, windSpeed: 14, pressure: 1005 },
  { targetDate: "2026-10-02", horizonHours: 96, prediction: 31.7, uncertainty: 2.1, baseline: 31.0, humidity: 60, windSpeed: 11, pressure: 1007 },
  { targetDate: "2026-10-03", horizonHours: 120, prediction: 32.4, uncertainty: 2.3, baseline: 31.4, humidity: 56, windSpeed: 9, pressure: 1009 },
];

export const futureForecastSeries: ForecastHistory[] = futureSpecs.map((spec) => ({
  date: spec.targetDate,
  forecast: spec.prediction,
  baseline: spec.baseline,
  lowerBound: Number((spec.prediction - spec.uncertainty).toFixed(1)),
  upperBound: Number((spec.prediction + spec.uncertainty).toFixed(1)),
}));

export const forecastScenarios: ForecastScenario[] = futureSpecs.map((spec) => ({
  id: `delhi-max-${spec.targetDate}`,
  location: "Delhi, India",
  target: "Maximum Temperature",
  issueTime: ISSUE_TIME,
  issueDate: PROTOTYPE_REFERENCE_DATE,
  targetDate: spec.targetDate,
  horizon: `${spec.horizonHours} hours`,
  horizonHours: spec.horizonHours,
  prediction: spec.prediction,
  lowerBound: Number((spec.prediction - spec.uncertainty).toFixed(1)),
  upperBound: Number((spec.prediction + spec.uncertainty).toFixed(1)),
  uncertainty: spec.uncertainty,
  baseline: spec.baseline,
  model: modelMetadata.algorithm,
  modelVersion: modelMetadata.version,
  chartData: futureForecastSeries,
  weatherContext: { temperature: spec.prediction, humidity: spec.humidity, windSpeed: spec.windSpeed, pressure: spec.pressure },
}));

export const defaultForecastScenario = forecastScenarios[0];

export function getForecastScenario(selection: { location: string; target: string; targetDate: string }) {
  return forecastScenarios.find((scenario) => scenario.location === selection.location && scenario.target === selection.target && scenario.targetDate === selection.targetDate);
}
export const getAvailableLocations = () => Array.from(new Set(forecastScenarios.map((scenario) => scenario.location)));
export const getAvailableTargets = (location = "Delhi, India") => Array.from(new Set(forecastScenarios.filter((scenario) => scenario.location === location).map((scenario) => scenario.target)));
export const getAvailableTargetDates = (location = "Delhi, India", target = "Maximum Temperature") => forecastScenarios.filter((scenario) => scenario.location === location && scenario.target === target).map((scenario) => scenario.targetDate);
