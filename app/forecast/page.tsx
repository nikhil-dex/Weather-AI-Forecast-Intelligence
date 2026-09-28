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
import { formatDate, formatTemperature } from "@/lib/formatters";
import { forecastScenarios } from "@/lib/forecast/forecast-data";

export default function ForecastPage() {
  const { scenario } = useForecast();
  return <PageContainer title="Forecast" description={`${scenario.location} · ${scenario.target} · ${scenario.horizon}`}>
    <ForecastControls/>
    <ForecastHero forecast={scenario} targetDate={scenario.targetDate}/>
    <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_1.25fr]">
      <Panel title="Forecast Details" tag="FUTURE FORECAST"><dl className="divide-y divide-white/[0.06]"><div className="flex justify-between gap-4 py-3 first:pt-0"><dt className="text-[11px] text-slate-400">Forecast issued</dt><dd className="text-right text-[11px] text-slate-200">{formatDate(`${scenario.issueDate}T12:00:00+05:30`)}</dd></div><div className="flex justify-between gap-4 py-3"><dt className="text-[11px] text-slate-400">Target date</dt><dd className="text-right text-[11px] text-slate-200">{formatDate(`${scenario.targetDate}T12:00:00+05:30`)}</dd></div><div className="flex justify-between gap-4 py-3"><dt className="text-[11px] text-slate-400">Forecast horizon</dt><dd className="text-right text-[11px] text-slate-200">{scenario.horizon}</dd></div><div className="flex justify-between gap-4 py-3 last:pb-0"><dt className="text-[11px] text-slate-400">Model configuration</dt><dd className="text-right text-[11px] text-slate-200">{scenario.model} {scenario.modelVersion}</dd></div></dl><div className="mt-5 grid grid-cols-2 gap-2 border-t border-white/[0.06] pt-4 sm:grid-cols-2"><MetricCard label="Forecast" value={formatTemperature(scenario.prediction)} detail="Point estimate"/><MetricCard label="Expected range" value={`${scenario.lowerBound.toFixed(1)}–${scenario.upperBound.toFixed(1)}°C`} detail={`±${scenario.uncertainty.toFixed(1)}°C uncertainty`} accent="indigo"/><MetricCard label="Baseline" value={formatTemperature(scenario.baseline)} detail="Persistence reference" accent="indigo"/><MetricCard label="Observed" value="Not available yet" detail="Future target date" accent="green"/></div></Panel>
      <Panel title="Forecast Horizon" subtitle="Predefined predictions, uncertainty bounds, and baseline" tag="FUTURE OUTLOOK"><ForecastChart data={scenario.chartData}/></Panel>
    </div>
    <div className="mt-5"><Panel title="Upcoming Forecast" subtitle="Five target dates from the fixed issue date" tag="DELHI · MAXIMUM TEMPERATURE"><div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">{forecastScenarios.map((item) => <article key={item.id} aria-current={item.id === scenario.id ? "date" : undefined} className={`rounded-xl border p-3 ${item.id === scenario.id ? "border-sky-300/25 bg-sky-300/[0.06]" : "border-white/[0.07] bg-white/[0.02]"}`}><p className="text-[10px] text-slate-400">{formatDate(`${item.targetDate}T12:00:00+05:30`)}</p><p className="mt-2 text-xl font-semibold tracking-tight text-slate-100">{formatTemperature(item.prediction)}</p><p className="mt-1 text-[10px] text-sky-200">{item.lowerBound.toFixed(1)}–{item.upperBound.toFixed(1)}°C</p><p className="mt-2 text-[9px] text-slate-400">{item.horizon} · baseline {item.baseline.toFixed(1)}°C</p></article>)}</div></Panel></div>
    <div className="mt-5 grid gap-5 xl:grid-cols-[1.4fr_1fr]"><Panel title="Uncertainty by Target Date" subtitle="Lower and upper prediction bounds across the selected horizon" tag="ESTIMATED UNCERTAINTY"><UncertaintyChart data={scenario.chartData}/></Panel><Panel title="How the forecast works" subtitle="From historical feature context to prediction" tag="MODEL PIPELINE"><WorkflowSteps/><p className="mt-4 text-[11px] leading-5 text-slate-400">The forecast interface presents a point estimate, persistence baseline, and uncertainty range for each predefined target date. Observed outcomes become available only in historical evaluation.</p></Panel></div>
  </PageContainer>;
}
