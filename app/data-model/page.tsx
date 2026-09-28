import { Activity, Archive, BrainCircuit, CalendarDays, ChartNoAxesCombined, Database, Gauge, GitBranch, Wind } from "lucide-react";
import { datasetMetadata, modelMetadata } from "@/data/mockMetadata";
import { forecast } from "@/data/mockForecast";
import { PageContainer } from "@/components/layout/PageContainer";
import { Panel } from "@/components/ui/Panel";

const modelFacts = [["Algorithm",modelMetadata.algorithm],["Version",modelMetadata.version],["Decision trees",String(modelMetadata.trees)],["Variables",String(modelMetadata.featureCount)],["Forecast horizon",modelMetadata.forecastHorizon]];
const flow = [[Archive,"Observations"],[BrainCircuit,"Forecast model"],[ChartNoAxesCombined,"Prediction"],[Activity,"Uncertainty"]] as const;
const flowIcons = [Activity,Gauge,Wind,CalendarDays,Database,GitBranch];

export default function DataModelPage() { return <PageContainer title="Data & Model" description="Explore forecast data provenance, model configuration, and evaluation methodology.">
  <div className="grid gap-5 xl:grid-cols-[1fr_.9fr]">
    <Panel title="Data Provenance" subtitle="Coverage and scope of the historical weather dataset">
      <dl className="grid gap-x-8 sm:grid-cols-2">{[["Source",datasetMetadata.source],["Region",datasetMetadata.geographicCoverage],["Coverage",datasetMetadata.historicalPeriod],["Resolution",datasetMetadata.resolution],["Records",datasetMetadata.records.toLocaleString()],["Units",datasetMetadata.units]].map(([label,value])=><div key={label} className="border-b border-white/[0.05] py-3 first:pt-0"><dt className="text-[10px] uppercase tracking-wider text-slate-600">{label}</dt><dd className="mt-1.5 text-[12px] text-slate-200">{value}</dd></div>)}</dl>
    </Panel>
    <Panel title="Model Configuration" subtitle="Versioned forecasting model">
      <dl className="divide-y divide-white/[0.06]">{modelFacts.map(([label,value])=><div key={label} className="flex justify-between gap-4 py-3 first:pt-0"><dt className="text-[11px] text-slate-500">{label}</dt><dd className="text-right text-[11px] text-slate-200">{value}</dd></div>)}</dl>
    </Panel>
  </div>
  <div className="mt-5"><Panel title="Feature Groups" subtitle="Eighteen input variables organized into interpretable groups"><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">{modelMetadata.features.map((group,i)=><article key={group.name} className="rounded-lg border border-white/[0.07] bg-white/[0.02] p-3"><div className="mb-2 flex items-center gap-2"><span className="text-sky-300">{(() => { const Icon=flowIcons[i%flowIcons.length]; return <Icon size={14}/>; })()}</span><h3 className="text-[11px] font-medium text-slate-200">{group.name}</h3></div><p className="min-h-8 text-[9px] leading-4 text-slate-500">{group.description}</p><ul className="mt-2 space-y-1 border-t border-white/[0.06] pt-2">{group.variables.map(variable=><li key={variable} className="text-[9px] text-slate-400">{variable}</li>)}</ul></article>)}</div></Panel></div>
  <div className="mt-5 grid gap-5 xl:grid-cols-[1.1fr_.9fr]">
    <Panel title="Training & Evaluation" subtitle="Chronological holdout for forward-in-time evaluation">
      <div className="mb-4 flex flex-wrap gap-x-6 gap-y-2 text-[11px]"><span><span className="text-slate-600">Training period</span><span className="ml-2 text-slate-200">{modelMetadata.trainingPeriod}</span></span><span><span className="text-slate-600">Evaluation period</span><span className="ml-2 text-slate-200">{modelMetadata.evaluationPeriod}</span></span><span><span className="text-slate-600">Validation</span><span className="ml-2 text-slate-200">{modelMetadata.split}</span></span></div>
      <div className="relative mt-7"><div className="flex h-12 overflow-hidden rounded-lg border border-white/[0.08]"><div className="flex w-4/5 items-center bg-sky-400/[0.14] px-4 text-[10px] font-medium tracking-wide text-sky-200">TRAINING · 2021–2024</div><div className="flex flex-1 items-center border-l border-indigo-300/20 bg-indigo-400/[0.13] px-3 text-[10px] font-medium tracking-wide text-indigo-200">TEST · 2025</div></div><div className="absolute -top-2 left-[80%] h-[calc(100%+17px)] border-l border-dashed border-indigo-300/50"/></div><div className="mt-3 flex items-center justify-between text-[9px] text-slate-600"><span>2021</span><span>2024</span><span>2025 · held-out period</span></div>
    </Panel>
    <Panel title="Forecast Pipeline" subtitle="From historical observations to prediction range"><div className="grid grid-cols-4 gap-2">{flow.map(([Icon,label],i)=><div key={label} className="relative flex flex-col items-center rounded-lg border border-white/[0.07] bg-white/[0.02] px-1 py-4 text-center"><span className="mb-2 grid h-8 w-8 place-items-center rounded-lg bg-sky-300/[0.08] text-sky-300"><Icon size={15}/></span><span className="text-[9px] leading-4 text-slate-400">{label}</span>{i<3&&<span className="absolute -right-2 top-7 z-10 text-slate-600">›</span>}</div>)}</div><div className="mt-4 rounded-lg border border-white/[0.06] bg-[#07111f]/50 p-3"><p className="text-[9px] uppercase tracking-widest text-slate-600">Forecast output</p><div className="mt-2 flex items-end justify-between"><span className="text-2xl font-semibold tracking-tight text-sky-200">{forecast.prediction.toFixed(1)}°C</span><span className="pb-1 text-[10px] text-slate-400">{forecast.lowerBound.toFixed(1)}° — {forecast.upperBound.toFixed(1)}°C</span></div></div></Panel>
  </div>
  <div className="mt-5 grid gap-5 lg:grid-cols-2">
    <Panel title="Data Quality" subtitle="Coverage and measurement notes"><ul className="space-y-2">{datasetMetadata.qualityNotes.map(note=><li key={note} className="flex gap-2 text-[10px] leading-4 text-slate-400"><span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-sky-300/70"/>{note}</li>)}</ul></Panel>
    <Panel title="Intended Use" subtitle="Analytical guidance for research and decision-support workflows"><p className="text-[11px] leading-5 text-slate-400">{modelMetadata.intendedUse}</p><p className="mt-3 border-t border-white/[0.06] pt-3 text-[10px] leading-4 text-slate-500">Historical evaluation metrics do not establish operational performance. Local conditions and extreme weather events may be underrepresented.</p></Panel>
  </div>
</PageContainer>; }
