import { modelMetadata } from "@/data/mockMetadata";
import type { Forecast, ForecastHistory, WeatherContext } from "@/types/forecast";
import { addDays, parseLocalDateKey, toLocalDateKey } from "@/lib/forecast/date-utils";

export interface ForecastScenario extends Omit<Forecast, "observed"> {
  id: string;
  dayOffset: number;
  issueDate: string;
  targetDate: string;
  horizonHours: number;
  uncertainty: number;
  chartData: ForecastHistory[];
  weatherContext: WeatherContext;
}

type FutureSpec = {
  dayOffset: number;
  prediction: number;
  uncertainty: number;
  baseline: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
};

const futureSpecs: FutureSpec[] = [
  { dayOffset: 1, prediction: 31.5, uncertainty: 1.8, baseline: 30.8, humidity: 61, windSpeed: 12, pressure: 1007 },
  { dayOffset: 2, prediction: 32.1, uncertainty: 1.9, baseline: 31.0, humidity: 58, windSpeed: 10, pressure: 1008 },
  { dayOffset: 3, prediction: 30.8, uncertainty: 1.9, baseline: 31.2, humidity: 65, windSpeed: 14, pressure: 1005 },
  { dayOffset: 4, prediction: 31.7, uncertainty: 2.1, baseline: 31.0, humidity: 60, windSpeed: 11, pressure: 1007 },
  { dayOffset: 5, prediction: 32.4, uncertainty: 2.3, baseline: 31.4, humidity: 56, windSpeed: 9, pressure: 1009 },
];

export function getForecastScenarios(issueDate: string | null): ForecastScenario[] {
  const issue = issueDate ? parseLocalDateKey(issueDate) : null;
  const chartData: ForecastHistory[] = futureSpecs.map((spec) => {
    const targetDate = issue ? toLocalDateKey(addDays(issue, spec.dayOffset)) : `+${spec.dayOffset}d`;
    return {
      date: targetDate,
      forecast: spec.prediction,
      baseline: spec.baseline,
      lowerBound: Number((spec.prediction - spec.uncertainty).toFixed(1)),
      upperBound: Number((spec.prediction + spec.uncertainty).toFixed(1)),
    };
  });

  return futureSpecs.map((spec) => {
    const scenarioIssueDate = issueDate ?? "";
    const targetDate = chartData[spec.dayOffset - 1].date;
    const horizonHours = spec.dayOffset * 24;
    const prediction = spec.prediction;
    return {
      id: `delhi-max-offset-${spec.dayOffset}`,
      dayOffset: spec.dayOffset,
      location: "Delhi, India",
      target: "Maximum Temperature",
      issueTime: issueDate ? `${issueDate}T12:00:00+05:30` : "",
      issueDate: scenarioIssueDate,
      targetDate: issueDate ? targetDate : "",
      horizon: `${horizonHours} hours`,
      horizonHours,
      prediction,
      lowerBound: Number((prediction - spec.uncertainty).toFixed(1)),
      upperBound: Number((prediction + spec.uncertainty).toFixed(1)),
      uncertainty: spec.uncertainty,
      baseline: spec.baseline,
      model: modelMetadata.algorithm,
      modelVersion: modelMetadata.version,
      chartData,
      weatherContext: { temperature: prediction, humidity: spec.humidity, windSpeed: spec.windSpeed, pressure: spec.pressure },
    };
  });
}

export const forecastScenarios = getForecastScenarios(null);
export const defaultForecastScenario = forecastScenarios[0];

export function getForecastScenario(selection: { location: string; target: string; dayOffset: number }, scenarios = forecastScenarios) {
  return scenarios.find((scenario) => scenario.location === selection.location && scenario.target === selection.target && scenario.dayOffset === selection.dayOffset);
}
export const getAvailableLocations = () => Array.from(new Set(forecastScenarios.map((scenario) => scenario.location)));
export const getAvailableTargets = (location = "Delhi, India") => Array.from(new Set(forecastScenarios.filter((scenario) => scenario.location === location).map((scenario) => scenario.target)));
