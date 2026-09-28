import type { EvaluationMetrics } from "@/types/evaluation";
const coverageCount = { covered: 320, total: 350 };
export const metrics: EvaluationMetrics = {
  model: { mae: 1.21, rmse: 1.63 }, baseline: { mae: 1.67, rmse: 2.08 },
  coverage: Number((coverageCount.covered / coverageCount.total * 100).toFixed(1)),
  evaluatedForecasts: 350, coverageCount
};
export const calibrationData = [
  { interval: "70%", covered: 238, total: 350 }, { interval: "80%", covered: 277, total: 350 },
  { interval: "90%", covered: coverageCount.covered, total: coverageCount.total }, { interval: "95%", covered: 326, total: 350 }
].map(point => ({ ...point, observed: Number((point.covered / point.total * 100).toFixed(1)) }));
