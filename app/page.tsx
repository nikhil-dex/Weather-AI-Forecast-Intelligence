"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { metrics } from "@/data/mockMetrics";
import { useForecast } from "@/components/providers/ForecastProvider";
import { PageContainer } from "@/components/layout/PageContainer";
import { Panel } from "@/components/ui/Panel";
import { MetricCard } from "@/components/ui/MetricCard";
import { ForecastChart } from "@/components/dashboard/ForecastChart";
import { ForecastHero } from "@/components/dashboard/ForecastHero";
import { UncertaintyChart } from "@/components/dashboard/UncertaintyChart";
import { WeatherContext } from "@/components/dashboard/WeatherContext";
import { formatTemperature } from "@/lib/formatters";
import { APP_NAME, APP_SUBTITLE } from "@/lib/constants";

export default function OverviewPage() {
  const { scenario, generatedAt } = useForecast();
  return <PageContainer title={APP_NAME} description={`${APP_SUBTITLE} · ${scenario.target} · ${scenario.location} · ${scenario.horizon}`}>
    <ForecastHero forecast={scenario}/>
    <p className="mt-2 text-right text-[10px] text-slate-400">{generatedAt ? `Generated at ${new Intl.DateTimeFormat("en-IN", { hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZone: "Asia/Kolkata" }).format(new Date(generatedAt))}` : "Default forecast scenario"}</p>
    <WeatherContext context={scenario.weatherContext}/>
    <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard label="AI Forecast" value={formatTemperature(scenario.prediction)} detail={`${scenario.target} · ${scenario.horizon}`}/>
      <MetricCard label="Baseline" value={formatTemperature(scenario.baseline)} detail="Persistence reference" accent="indigo"/>
      <MetricCard label="Observed" value={formatTemperature(scenario.observed ?? 0)} detail="Historical observation" accent="green"/>
      <MetricCard label="Absolute Error" value={`${scenario.absoluteError.toFixed(1)}°C`} detail="Forecast vs observed" accent="amber"/>
    </div>
    <div className="mt-5 grid gap-5 xl:grid-cols-[1.55fr_1fr]">
      <Panel title="Forecast vs Actual" subtitle={`${scenario.location} · ${scenario.target} · selected historical outcomes`} tag="HISTORICAL SERIES"><ForecastChart data={scenario.historicalSeries}/></Panel>
      <Panel title="Prediction Range" subtitle="Upper and lower bounds around each forecast" tag="ESTIMATED UNCERTAINTY"><UncertaintyChart data={scenario.historicalSeries}/></Panel>
    </div>
    <div className="mt-5 grid gap-5 xl:grid-cols-[1.2fr_1fr]">
      <Panel title="Model Performance" subtitle={`2025 holdout · ${metrics.evaluatedForecasts} evaluated forecasts · lower error is better`}><div className="grid grid-cols-[1fr_1fr_1fr] items-center gap-2 border-b border-white/[0.07] pb-3 text-[9px] font-medium uppercase tracking-wider text-slate-400"><span>Metric</span><span className="text-right">AI model</span><span className="text-right">Baseline</span></div>{[["MAE",metrics.model.mae,metrics.baseline.mae],["RMSE",metrics.model.rmse,metrics.baseline.rmse]].map(([name,ai,base])=><div key={String(name)} className="grid grid-cols-[1fr_1fr_1fr] items-center gap-2 border-b border-white/[0.05] py-4 last:border-0"><span className="text-xs text-slate-300">{name} <span className="text-slate-400">°C</span></span><span className="text-right text-sm font-medium text-sky-200">{ai}</span><span className="text-right text-sm text-slate-400">{base}</span></div>)}<div className="mt-2 flex items-center justify-between border-t border-white/[0.06] pt-3 text-[10px]"><span className="text-slate-400">Prediction interval coverage</span><span className="text-slate-300">{metrics.coverage}% <span className="text-slate-400">({metrics.coverageCount.covered}/{metrics.coverageCount.total})</span></span></div><Link href="/evaluation" className="mt-4 inline-flex items-center gap-1.5 text-[11px] text-sky-300 hover:text-sky-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300">View full evaluation <ArrowRight size={13}/></Link></Panel>
      <Panel title="Forecast Model" subtitle="Versioned model configuration"><p className="text-lg font-medium text-slate-100">{scenario.model}</p><p className="mt-1 text-[11px] text-slate-400">Version {scenario.modelVersion} · {scenario.horizon} horizon</p><div className="mt-5 border-t border-white/[0.06] pt-4"><p className="text-[10px] uppercase tracking-wider text-slate-400">Interpretation</p><p className="mt-2 text-[11px] leading-5 text-slate-400">Compare each prediction with its expected range, baseline, and observed outcome to understand forecast performance.</p></div><Link href="/data-model" className="mt-4 inline-flex items-center gap-1.5 text-[11px] text-sky-300 hover:text-sky-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300">Explore data &amp; model <ArrowRight size={13}/></Link></Panel>
    </div>
  </PageContainer>;
}
