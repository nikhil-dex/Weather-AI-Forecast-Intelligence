import type { DatasetMetadata, ModelMetadata } from "@/types/dataset";
export const datasetMetadata: DatasetMetadata = {
  source: "Historical weather observations", geographicCoverage: "Delhi, India", historicalPeriod: "2021–2025",
  records: 1825, resolution: "Daily", units: "Temperature: °C; precipitation: mm; humidity: %",
  qualityNotes: ["Daily records are aligned to the 2021–2025 coverage period.", "Measurement availability can vary by variable."]
};
export const modelMetadata: ModelMetadata = {
  name: "Weather AI", algorithm: "Random Forest Regression", version: "1.0", trees: 100, featureCount: 18, features: [
    { name: "Temperature", description: "Historical temperature measurements", variables: ["Maximum temperature", "Minimum temperature", "Mean temperature"] },
    { name: "Atmospheric", description: "Pressure and moisture conditions", variables: ["Pressure", "Humidity", "Precipitation", "Cloud cover"] },
    { name: "Wind", description: "Wind speed and direction", variables: ["Wind speed", "Wind direction"] },
    { name: "Temporal", description: "Seasonal and calendar signals", variables: ["Day of year", "Month", "Season"] },
    { name: "Lag features", description: "Recent historical observations", variables: ["1-day", "2-day", "3-day", "5-day", "7-day", "14-day values"] }
  ],
  trainingPeriod: "2021–2024", evaluationPeriod: "2025", split: "Chronological holdout", forecastHorizon: "24 hours",
  intendedUse: "Weather AI provides analytical forecast guidance and model evaluation for research and decision-support workflows. Forecast uncertainty should be considered when interpreting results.",
  limitations: ["Historical evaluation metrics do not establish operational performance.", "Forecast uncertainty should be considered when interpreting results.", "Local conditions and extreme weather events may be underrepresented."]
};
