import { forecast } from "@/data/mockForecast";
import { forecastHistory } from "@/data/mockHistory";
import { PageContainer } from "@/components/layout/PageContainer";
import { Panel } from "@/components/ui/Panel";
import { MetricCard } from "@/components/ui/MetricCard";
import { ForecastChart } from "@/components/dashboard/ForecastChart";
import { ForecastHero } from "@/components/dashboard/ForecastHero";
import { UncertaintyRange } from "@/components/dashboard/UncertaintyRange";
import { WorkflowSteps } from "@/components/forecast/WorkflowSteps";
import { formatDateTime, formatTemperature } from "@/lib/formatters";
export default function ForecastPage() { return <PageContainer title="Forecast" description="Detailed prediction analysis for Delhi · next-day maximum temperature.">
  <ForecastHero forecast={forecast}/>
  <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1.25fr]">
    <Panel title="Forecast Details" tag="ISSUED FORECAST"><dl className="divide-y divide-white/[0.06]">{[["Issue time",formatDateTime(forecast.issueTime)],["Forecast horizon",forecast.horizon],["Target",forecast.target],["Forecast model",`Random Forest Regression ${forecast.modelVersion}`]].map(([label,value])=><div key={label} className="flex justify-between gap-4 py-3 first:pt-0 last:pb-0"><dt className="text-[11px] text-slate-500">{label}</dt><dd className="text-right text-[11px] text-slate-200">{value}</dd></div>)}</dl><div className="mt-5 grid grid-cols-3 gap-2 border-t border-white/[0.06] pt-4"><MetricCard label="AI Forecast" value={formatTemperature(forecast.prediction)} detail="Forecast model"/><MetricCard label="Baseline" value={formatTemperature(forecast.baseline)} detail="Persistence" accent="indigo"/><MetricCard label="Observed" value={formatTemperature(forecast.observed ?? 0)} detail="Historical actual" accent="green"/></div></Panel>
    <Panel title="Forecast Uncertainty" subtitle="Estimated range around the AI prediction"><UncertaintyRange forecast={forecast}/><div className="mt-5"><ForecastChart data={forecastHistory}/></div></Panel>
  </div>
  <div className="mt-5 grid gap-5 xl:grid-cols-[1.4fr_1fr]"><Panel title="Forecast History" subtitle="Forecast, observed outcome, and persistence baseline" tag="HISTORICAL WEATHER OBSERVATIONS"><ForecastChart data={forecastHistory}/></Panel><Panel title="How the forecast works" subtitle="From historical observations to prediction" tag="MODEL PIPELINE"><WorkflowSteps/><p className="mt-4 text-[11px] leading-5 text-slate-500">Historical observations are organized into model features, then passed through the Random Forest model to produce a point estimate and prediction range.</p></Panel></div>
</PageContainer>; }
