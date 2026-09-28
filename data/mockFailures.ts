import type { FailureCase } from "@/types/evaluation";
export const failures: FailureCase[] = [
  { date: "Sep 14", forecast: 34.2, actual: 29.8, error: 4.4, note: "A localized shower lowered the observed maximum temperature." },
  { date: "Sep 19", forecast: 28.7, actual: 32.1, error: -3.4, note: "Rapid cloud clearing raised temperatures beyond the prediction." },
  { date: "Sep 24", forecast: 31.2, actual: 34.0, error: -2.8, note: "Daytime heating was stronger than the model estimate." }
];
export const successes: FailureCase[] = [
  { date: "Sep 24", forecast: 32.0, actual: 33.1, error: -1.1, note: "Prediction remained within the expected interval." },
  { date: "Sep 27", forecast: 31.5, actual: 32.1, error: -0.6, note: "Close agreement with the observed maximum." }
];
