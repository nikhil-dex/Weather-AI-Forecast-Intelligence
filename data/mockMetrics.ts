import type { EvaluationMetrics } from "@/types/evaluation";
export const metrics: EvaluationMetrics = { model: { mae: 1.21, rmse: 1.63 }, baseline: { mae: 1.67, rmse: 2.08 }, coverage: 91.4 };
export const calibrationData = [{ interval: "70%", observed: 68 }, { interval: "80%", observed: 79 }, { interval: "90%", observed: 91 }, { interval: "95%", observed: 93 }];
