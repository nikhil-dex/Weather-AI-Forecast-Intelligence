"use client";
import { useForecast } from "@/components/providers/ForecastProvider";
import { ForecastControls } from "@/components/forecast/ForecastControls";
import { WorkflowSteps } from "@/components/forecast/WorkflowSteps";
import { ForecastHero } from "@/components/dashboard/ForecastHero";
import { ForecastChart } from "@/components/dashboard/ForecastChart";
import { UncertaintyChart } from "@/components/dashboard/UncertaintyChart";
import { PageContainer } from "@/components/layout/PageContainer";
import { Panel } from "@/components/ui/Panel";
import { MetricCard } from "@/components/ui/MetricCard";
import { formatDate, formatDateTime, formatTemperature } from "@/lib/formatters";

export default function ForecastPage() {
  const { scenario } = useForecast();
  return <PageContainer title="Forecast" description={`${scenario.location} · ${scenario.target} · ${scenario.horizon}`}>
    <ForecastControls/>
    <ForecastHero forecast={scenario}/>
    <div className="mt-2 text-right text-[10px] text-slate-400">Forecast date: {formatDate(scenario.issueTime)}</div>
    <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_1.25fr]">
      <Panel title="Forecast Details" tag="ISSUED FORECAST"><dl className="divide-y divide-white/[0.06]">{[["Issue time",formatDateTime(scenario.issueTime)],["Forecast horizon",scenario.horizon],["Target",scenario.target],["Forecast model",`${scenario.model} ${scenario.modelVersion}`]].map(([label,value])=><div key={label} className="flex justify-between gap-4 py-3 first:pt-0 last:pb-0"><dt className="text-[11px] text-slate-400">{label}</dt><dd className="text-right text-[11px] text-slate-200">{value}</dd></div>)}</dl><div className="mt-5 grid grid-cols-2 gap-2 border-t border-white/[0.06] pt-4 sm:grid-cols-4"><MetricCard label="AI Forecast" value={formatTemperature(scenario.prediction)} detail="Forecast model"/><MetricCard label="Range" value={`${scenario.lowerBound.toFixed(1)}–${scenario.upperBound.toFixed(1)}°C`} detail={`±${scenario.uncertainty.toFixed(1)}°C uncertainty`} accent="indigo"/><MetricCard label="Baseline" value={formatTemperature(scenario.baseline)} detail="Persistence" accent="indigo"/><MetricCard label="Observed / Error" value={formatTemperature(scenario.observed ?? 0)} detail={`${scenario.absoluteError.toFixed(1)}°C absolute error`} accent="green"/></div></Panel>
      <Panel title="Forecast Uncertainty" subtitle="Upper and lower bounds around selected historical predictions"><UncertaintyChart data={scenario.historicalSeries}/></Panel>
    </div>
    <div className="mt-5 grid gap-5 xl:grid-cols-[1.4fr_1fr]"><Panel title="Forecast History" subtitle={`${scenario.location} · ${scenario.target} · selected outcomes`} tag="HISTORICAL OBSERVATIONS"><ForecastChart data={scenario.historicalSeries}/></Panel><Panel title="How the forecast works" subtitle="From historical observations to prediction" tag="MODEL PIPELINE"><WorkflowSteps/><p className="mt-4 text-[11px] leading-5 text-slate-400">Historical observations are organized into model features, then passed through the Random Forest model to produce a point estimate and prediction range.</p></Panel></div>
  </PageContainer>;
}
