import { calibrationData, metrics } from "@/data/mockMetrics";
import { forecastHistory } from "@/data/mockHistory";
import { failures, successes } from "@/data/mockFailures";
import { PageContainer } from "@/components/layout/PageContainer";
import { Panel } from "@/components/ui/Panel";
import { MetricCard } from "@/components/ui/MetricCard";
import { ForecastChart } from "@/components/dashboard/ForecastChart";
import { ErrorChart } from "@/components/evaluation/ErrorChart";
import { CalibrationChart } from "@/components/evaluation/CalibrationChart";
import { FailureCases } from "@/components/evaluation/FailureCases";

export default function EvaluationPage() {
  return <PageContainer title="Model Evaluation" description={`Historical forecasting performance · 2025 holdout · ${metrics.evaluatedForecasts} evaluated forecasts.`}>
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard label="MAE · AI model" value={`${metrics.model.mae}°C`} detail="350 forecast evaluations"/>
      <MetricCard label="RMSE · AI model" value={`${metrics.model.rmse}°C`} detail="350 forecast evaluations" accent="indigo"/>
      <MetricCard label="Baseline MAE" value={`${metrics.baseline.mae}°C`} detail="Persistence reference" accent="green"/>
      <MetricCard label="Interval coverage" value={`${metrics.coverage}%`} detail={`${metrics.coverageCount.covered} of ${metrics.coverageCount.total} intervals`} accent="amber"/>
    </div>
    <div className="mt-5"><Panel title="Model Performance" subtitle="Aggregate error across 350 evaluated forecasts · lower values indicate smaller errors"><div className="grid grid-cols-[1fr_1fr_1fr] items-center gap-2 border-b border-white/[0.07] pb-3 text-[9px] font-medium uppercase tracking-wider text-slate-400"><span>Metric</span><span className="text-right">AI model</span><span className="text-right">Baseline</span></div>{[["MAE",metrics.model.mae,metrics.baseline.mae],["RMSE",metrics.model.rmse,metrics.baseline.rmse]].map(([label,model,baseline])=><div key={String(label)} className="grid grid-cols-[1fr_1fr_1fr] items-center gap-2 border-b border-white/[0.05] py-3 last:border-0"><span className="text-xs text-slate-300">{label} <span className="text-slate-400">°C</span></span><span className="text-right text-sm font-medium text-sky-200">{Number(model).toFixed(2)}</span><span className="text-right text-sm text-slate-300">{Number(baseline).toFixed(2)}</span></div>)}</Panel></div>
    <div className="mt-5"><Panel title="Forecast Accuracy" subtitle="Selected daily outcomes · September 2025" tag="HISTORICAL EVALUATION"><ForecastChart data={forecastHistory}/></Panel></div>
    <div className="mt-5 grid gap-5 xl:grid-cols-2">
      <Panel title="Error Distribution" subtitle="Signed forecast error by date · forecast minus observed"><ErrorChart data={forecastHistory}/></Panel>
      <Panel title="Prediction Interval Coverage" subtitle="Nominal range compared with observed historical coverage"><CalibrationChart data={calibrationData}/></Panel>
    </div>
    <div className="mt-5 grid gap-5 lg:grid-cols-2">
      <FailureCases title="Representative Forecast Misses" description="Large errors can indicate where more weather variables or finer spatial resolution may help." cases={failures}/>
      <FailureCases title="Representative Successful Predictions" description="Examples where the forecast tracked observed conditions." cases={successes}/>
    </div>
  </PageContainer>;
}
