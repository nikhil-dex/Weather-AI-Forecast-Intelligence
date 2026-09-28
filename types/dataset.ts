export interface DatasetMetadata { source: string; geographicCoverage: string; historicalPeriod: string; records: number; resolution: string; units: string; qualityNotes: string[] }
export interface FeatureGroup { name: string; description: string; variables: string[] }
export interface ModelMetadata { name: string; algorithm: string; version: string; trees: number; featureCount: number; features: FeatureGroup[]; trainingPeriod: string; evaluationPeriod: string; split: string; forecastHorizon: string; intendedUse: string; limitations: string[] }
