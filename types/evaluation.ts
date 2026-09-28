export interface EvaluationMetrics { model: { mae: number; rmse: number }; baseline: { mae: number; rmse: number }; coverage: number; evaluatedForecasts: number; coverageCount: { covered: number; total: number } }
export interface FailureCase { date: string; forecast: number; actual: number; error: number; note: string }
export interface CalibrationPoint { interval: string; observed: number; covered: number; total: number }
