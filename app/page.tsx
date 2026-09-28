import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { forecast, weatherContext } from "@/data/mockForecast";
import { forecastHistory } from "@/data/mockHistory";
import { metrics } from "@/data/mockMetrics";
import { PageContainer } from "@/components/layout/PageContainer";
import { Panel } from "@/components/ui/Panel";
import { MetricCard } from "@/components/ui/MetricCard";
import { ForecastChart } from "@/components/dashboard/ForecastChart";
import { ForecastHero } from "@/components/dashboard/ForecastHero";
import { UncertaintyRange } from "@/components/dashboard/UncertaintyRange";
import { WeatherContext } from "@/components/dashboard/WeatherContext";
import { formatTemperature } from "@/lib/formatters";

export default function OverviewPage() {
  const error = Math.abs(forecast.prediction - (forecast.observed ?? forecast.prediction));
  return <PageContainer title="Weather AI" description="AI-powered weather forecasting intelligence.">
    <ForecastHero forecast={forecast}/>
    <WeatherContext context={weatherContext}/>
    <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard label="AI Forecast" value={formatTemperature(forecast.prediction)} detail="Random Forest Regression · 24h"/>
      <MetricCard label="Baseline" value={formatTemperature(forecast.baseline)} detail="Persistence reference" accent="indigo"/>
      <MetricCard label="Observed" value={formatTemperature(forecast.observed ?? 0)} detail="Historical observation" accent="green"/>
      <MetricCard label="Absolute Error" value={`${error.toFixed(1)}°C`} detail="Forecast vs observed" accent="amber"/>
    </div>
    <div className="mt-5 grid gap-5 xl:grid-cols-[1.55fr_1fr]">
      <Panel title="Forecast vs Actual" subtitle="Historical performance across the evaluation period" tag="HISTORICAL EVALUATION"><ForecastChart data={forecastHistory}/></Panel>
      <Panel title="Prediction Range" subtitle="Estimated forecast uncertainty"><UncertaintyRange forecast={forecast}/></Panel>
    </div>
    <div className="mt-5 grid gap-5 xl:grid-cols-[1.2fr_1fr]">
      <Panel title="Model Performance" subtitle="Historical evaluation · lower error is better"><div className="grid grid-cols-[1fr_1fr_1fr] items-center gap-2 border-b border-white/[0.07] pb-3 text-[9px] font-medium uppercase tracking-wider text-slate-600"><span>Metric</span><span className="text-right">AI model</span><span className="text-right">Baseline</span></div>{[["MAE",metrics.model.mae,metrics.baseline.mae],["RMSE",metrics.model.rmse,metrics.baseline.rmse]].map(([name,ai,base])=><div key={String(name)} className="grid grid-cols-[1fr_1fr_1fr] items-center gap-2 border-b border-white/[0.05] py-4 last:border-0"><span className="text-xs text-slate-300">{name} <span className="text-slate-600">°C</span></span><span className="text-right text-sm font-medium text-sky-200">{ai}</span><span className="text-right text-sm text-slate-400">{base}</span></div>)}<div className="mt-2 flex items-center justify-between border-t border-white/[0.06] pt-3 text-[10px]"><span className="text-slate-500">Prediction interval coverage</span><span className="text-slate-300">{metrics.coverage}%</span></div><Link href="/evaluation" className="mt-4 inline-flex items-center gap-1.5 text-[11px] text-sky-300 hover:text-sky-200">View full evaluation <ArrowRight size={13}/></Link></Panel>
      <Panel title="Forecast Model" subtitle="Versioned model configuration"><p className="text-lg font-medium text-slate-100">Random Forest Regression</p><p className="mt-1 text-[11px] text-slate-500">Version 1.0 · 24-hour horizon</p><div className="mt-5 border-t border-white/[0.06] pt-4"><p className="text-[10px] uppercase tracking-wider text-slate-600">Interpretation</p><p className="mt-2 text-[11px] leading-5 text-slate-400">Compare each prediction with its expected range, baseline, and observed outcome to understand forecast performance.</p></div><Link href="/data-model" className="mt-4 inline-flex items-center gap-1.5 text-[11px] text-sky-300 hover:text-sky-200">Explore data & model <ArrowRight size={13}/></Link></Panel>
    </div>
  </PageContainer>;
}
