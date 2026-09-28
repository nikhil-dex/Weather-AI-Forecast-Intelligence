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
import { formatForecastDate } from "@/lib/forecast/date-utils";
import { APP_NAME, APP_SUBTITLE } from "@/lib/constants";

export default function OverviewPage() {
  const { scenario, scenarios, generatedAt } = useForecast();
  return <PageContainer title={APP_NAME} description={`${APP_SUBTITLE} · ${scenario.target} · ${scenario.location} · ${scenario.horizon}`}>
    <ForecastHero forecast={scenario} targetDate={scenario.targetDate} issueDate={scenario.issueDate} dayOffset={scenario.dayOffset}/>
    <p className="mt-2 text-right text-[10px] text-slate-400">{generatedAt ? `Generated at ${new Intl.DateTimeFormat("en-IN", { hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZone: "Asia/Kolkata" }).format(new Date(generatedAt))}` : "Default forecast scenario"}</p>
    <WeatherContext context={scenario.weatherContext}/>
    <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard label="Forecast" value={formatTemperature(scenario.prediction)} detail={`${scenario.target} · ${scenario.horizon}`}/>
      <MetricCard label="Baseline" value={formatTemperature(scenario.baseline)} detail="Persistence reference" accent="indigo"/>
      <MetricCard label="Forecast Target" value={formatForecastDate(scenario.targetDate, scenario.dayOffset)} detail="Target date" accent="green"/>
      <MetricCard label="Uncertainty" value={`±${scenario.uncertainty.toFixed(1)}°C`} detail={`${scenario.horizon} horizon`} accent="amber"/>
    </div>
    <div className="mt-5"><Panel title="Upcoming Forecast" subtitle="Predefined maximum temperature outlook for Delhi" tag="FIVE-DAY HORIZON"><div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">{scenarios.map((item) => <article key={item.id} className={`rounded-xl border p-3 ${item.id === scenario.id ? "border-sky-300/25 bg-sky-300/[0.06]" : "border-white/[0.07] bg-white/[0.02]"}`}><p className="text-[10px] text-slate-400">{formatForecastDate(item.targetDate, item.dayOffset)}</p><p className="mt-2 text-xl font-semibold tracking-tight text-slate-100">{formatTemperature(item.prediction)}</p><p className="mt-1 text-[10px] text-sky-200">{item.lowerBound.toFixed(1)}–{item.upperBound.toFixed(1)}°C</p><p className="mt-2 text-[9px] text-slate-400">{item.horizon} horizon</p></article>)}</div></Panel></div>
    <div className="mt-5"><Panel title="Using Weather AI" subtitle="A quick guide to forecasts, evaluation, and methodology"><div className="grid gap-4 sm:grid-cols-3"><div><p className="text-[10px] font-semibold uppercase tracking-wider text-sky-300">01 · Choose</p><p className="mt-1.5 text-[11px] leading-5 text-slate-300">Open Forecast and select one of the available target dates.</p></div><div><p className="text-[10px] font-semibold uppercase tracking-wider text-sky-300">02 · Generate</p><p className="mt-1.5 text-[11px] leading-5 text-slate-300">Generate the selected scenario, then review its temperature, uncertainty range, horizon, and baseline.</p></div><div><p className="text-[10px] font-semibold uppercase tracking-wider text-sky-300">03 · Explore</p><p className="mt-1.5 text-[11px] leading-5 text-slate-300">Use Evaluation for historical outcomes and Data &amp; Model for configuration, methodology, and limitations.</p></div></div><div className="mt-4 flex flex-wrap gap-4 border-t border-white/[0.06] pt-3"><Link href="/forecast" className="text-[11px] text-sky-300 hover:text-sky-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300">Open Forecast <ArrowRight size={12} className="ml-1 inline"/></Link><Link href="/evaluation" className="text-[11px] text-sky-300 hover:text-sky-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300">Review Evaluation <ArrowRight size={12} className="ml-1 inline"/></Link><Link href="/data-model" className="text-[11px] text-sky-300 hover:text-sky-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300">Explore Data &amp; Model <ArrowRight size={12} className="ml-1 inline"/></Link></div></Panel></div>
    <div className="mt-5 grid gap-5 xl:grid-cols-[1.55fr_1fr]">
      <Panel title="Forecast Horizon" subtitle={`${scenario.location} · ${scenario.target} · target dates`} tag="FUTURE OUTLOOK"><ForecastChart data={scenario.chartData}/></Panel>
      <Panel title="Prediction Range" subtitle="Upper and lower bounds around each forecast" tag="ESTIMATED UNCERTAINTY"><UncertaintyChart data={scenario.chartData}/></Panel>
    </div>
    <div className="mt-5 grid gap-5 xl:grid-cols-[1.2fr_1fr]">
      <Panel title="Model Performance" subtitle={`2025 holdout · ${metrics.evaluatedForecasts} evaluated forecasts · lower error is better`}><div className="grid grid-cols-[1fr_1fr_1fr] items-center gap-2 border-b border-white/[0.07] pb-3 text-[9px] font-medium uppercase tracking-wider text-slate-400"><span>Metric</span><span className="text-right">AI model</span><span className="text-right">Baseline</span></div>{[["MAE",metrics.model.mae,metrics.baseline.mae],["RMSE",metrics.model.rmse,metrics.baseline.rmse]].map(([name,ai,base])=><div key={String(name)} className="grid grid-cols-[1fr_1fr_1fr] items-center gap-2 border-b border-white/[0.05] py-4 last:border-0"><span className="text-xs text-slate-300">{name} <span className="text-slate-400">°C</span></span><span className="text-right text-sm font-medium text-sky-200">{ai}</span><span className="text-right text-sm text-slate-400">{base}</span></div>)}<div className="mt-2 flex items-center justify-between border-t border-white/[0.06] pt-3 text-[10px]"><span className="text-slate-400">Prediction interval coverage</span><span className="text-slate-300">{metrics.coverage}% <span className="text-slate-400">({metrics.coverageCount.covered}/{metrics.coverageCount.total})</span></span></div><Link href="/evaluation" className="mt-4 inline-flex items-center gap-1.5 text-[11px] text-sky-300 hover:text-sky-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300">View full evaluation <ArrowRight size={13}/></Link></Panel>
      <Panel title="Model Configuration" subtitle="Versioned model metadata"><p className="text-lg font-medium text-slate-100">{scenario.model}</p><p className="mt-1 text-[11px] text-slate-400">Version {scenario.modelVersion} · {scenario.horizon} horizon</p><div className="mt-5 border-t border-white/[0.06] pt-4"><p className="text-[10px] uppercase tracking-wider text-slate-400">Interpretation</p><p className="mt-2 text-[11px] leading-5 text-slate-400">Compare the point estimate with its expected range and baseline. Observations and error metrics belong to historical evaluation.</p></div><Link href="/data-model" className="mt-4 inline-flex items-center gap-1.5 text-[11px] text-sky-300 hover:text-sky-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300">Explore data &amp; model <ArrowRight size={13}/></Link></Panel>
    </div>
  </PageContainer>;
}
