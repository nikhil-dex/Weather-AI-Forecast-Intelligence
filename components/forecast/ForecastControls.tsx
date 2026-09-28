"use client";
import { useEffect, useState } from "react";
import { Check, LoaderCircle, Play, RotateCcw } from "lucide-react";
import { formatDate, formatDateTime } from "@/lib/formatters";
import { getAvailableHorizons, getAvailableIssueDates, getAvailableLocations, getAvailableTargets, getForecastScenario } from "@/lib/forecast/forecast-data";
import { useForecast } from "@/components/providers/ForecastProvider";

const stages = ["Analyzing atmospheric conditions", "Processing historical patterns", "Generating forecast", "Estimating uncertainty"];
export function ForecastControls() {
  const { scenario, generatedAt, generate, reset } = useForecast();
  const [location, setLocation] = useState(scenario.location);
  const [target, setTarget] = useState(scenario.target);
  const [horizon, setHorizon] = useState(scenario.horizon);
  const [issueDate, setIssueDate] = useState(scenario.issueTime.slice(0, 10));
  const [stage, setStage] = useState(-1);
  const [success, setSuccess] = useState(false);
  useEffect(() => { setLocation(scenario.location); setTarget(scenario.target); setHorizon(scenario.horizon); setIssueDate(scenario.issueTime.slice(0, 10)); }, [scenario.id, scenario.location, scenario.target, scenario.horizon, scenario.issueTime]);
  const busy = stage >= 0;
  const dates = getAvailableIssueDates(location, target, horizon);
  const start = async () => {
    const result = getForecastScenario({ location, target, issueDate, horizon });
    if (!result || busy) return;
    setSuccess(false);
    for (let i = 0; i < stages.length; i += 1) {
      setStage(i);
      await new Promise((resolve) => window.setTimeout(resolve, 300));
    }
    generate(result);
    setStage(-1);
    setSuccess(true);
  };
  const doReset = () => {
    reset(); setLocation("Delhi, India"); setTarget("Next-day maximum temperature"); setHorizon("24 hours"); setIssueDate("2025-09-28"); setStage(-1); setSuccess(false);
  };
  const selectClass = "mt-1.5 h-10 w-full rounded-lg border border-white/[0.09] bg-[#081525] px-3 text-xs text-slate-100 outline-none transition focus:border-sky-300/50 focus:ring-2 focus:ring-sky-300/15 disabled:cursor-not-allowed disabled:opacity-60";
  return <section aria-label="Forecast controls" className="mb-5 rounded-2xl border border-white/[0.08] bg-[#0b1728]/85 p-4 sm:p-5">
    <div className="mb-4 flex flex-wrap items-start justify-between gap-3"><div><h2 className="text-sm font-semibold text-slate-100">Forecast Engine</h2><p className="mt-1 text-[11px] text-slate-400">Configure a forecast scenario and review its prediction range.</p></div><span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/15 bg-emerald-300/[0.05] px-2.5 py-1 text-[10px] text-emerald-200"><span className="h-1.5 w-1.5 rounded-full bg-emerald-300"/>Forecast Model Ready</span></div>
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-[1.1fr_1.5fr_0.8fr_1.1fr_auto_auto] xl:items-end">
      <label className="text-[10px] font-medium uppercase tracking-wider text-slate-400">Location<select className={selectClass} value={location} disabled={busy} onChange={(e) => setLocation(e.target.value)}>{getAvailableLocations().map((v) => <option key={v}>{v}</option>)}</select></label>
      <label className="text-[10px] font-medium uppercase tracking-wider text-slate-400">Target<select className={selectClass} value={target} disabled={busy} onChange={(e) => setTarget(e.target.value)}>{getAvailableTargets(location).map((v) => <option key={v}>{v}</option>)}</select></label>
      <label className="text-[10px] font-medium uppercase tracking-wider text-slate-400">Horizon<select className={selectClass} value={horizon} disabled={busy} onChange={(e) => setHorizon(e.target.value)}>{getAvailableHorizons(location,target).map((v) => <option key={v}>{v}</option>)}</select></label>
      <label className="text-[10px] font-medium uppercase tracking-wider text-slate-400">Forecast date<select className={selectClass} value={issueDate} disabled={busy} onChange={(e) => setIssueDate(e.target.value)}>{dates.map((v) => <option key={v} value={v}>{formatDate(`${v}T12:00:00+05:30`)}</option>)}</select></label>
      <button type="button" onClick={start} disabled={busy} aria-busy={busy} className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-sky-300 px-4 text-xs font-semibold text-slate-950 transition hover:bg-sky-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 disabled:cursor-wait disabled:opacity-70"><>{busy ? <LoaderCircle size={14} className="animate-spin"/> : <Play size={13} fill="currentColor"/>}{busy ? "Generating…" : "Generate Forecast"}</></button>
      <button type="button" onClick={doReset} disabled={busy} className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-white/[0.1] px-3 text-xs text-slate-300 transition hover:bg-white/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 disabled:opacity-50"><RotateCcw size={13}/>Reset</button>
    </div>
    {busy && <div className="mt-4 rounded-lg border border-sky-300/[0.1] bg-sky-300/[0.035] p-3" role="status" aria-live="polite"><div className="mb-2 flex items-center justify-between text-[11px]"><span className="text-slate-200">{stages[stage]}…</span><span className="text-slate-400">{Math.round(((stage + 1) / stages.length) * 100)}%</span></div><div className="h-1 overflow-hidden rounded-full bg-white/[0.08]"><div className="h-full rounded-full bg-sky-300 transition-all duration-300" style={{ width: `${((stage + 1) / stages.length) * 100}%` }}/></div></div>}
    <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[10px]" aria-live="polite">{success && <p role="status" className="inline-flex items-center gap-1.5 text-emerald-200"><Check size={12}/>Forecast generated successfully</p>}<p className="ml-auto text-slate-400">{generatedAt ? `Generated at ${formatDateTime(generatedAt)}` : `Showing default forecast · ${formatDate(scenario.issueTime)}`}</p></div>
  </section>;
}
