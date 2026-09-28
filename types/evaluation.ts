export interface EvaluationMetrics { model: { mae: number; rmse: number }; baseline: { mae: number; rmse: number }; coverage: number }
export interface FailureCase { date: string; forecast: number; actual: number; error: number; note: string }
export interface CalibrationPoint { interval: string; observed: number }
