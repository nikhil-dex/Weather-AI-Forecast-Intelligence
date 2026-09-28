"use client";
import { useEffect, useState } from "react";
import { Check, LoaderCircle, Play, RotateCcw } from "lucide-react";
import { formatDate, formatDateTime } from "@/lib/formatters";
import { getAvailableLocations, getAvailableTargets, getAvailableTargetDates, getForecastScenario, PROTOTYPE_REFERENCE_DATE } from "@/lib/forecast/forecast-data";
import { useForecast } from "@/components/providers/ForecastProvider";

const stages = ["Checking the selected target date", "Loading forecast scenario", "Preparing the forecast summary", "Finalizing the uncertainty range"];
export function ForecastControls() {
  const { scenario, generatedAt, generate, reset } = useForecast();
  const [location, setLocation] = useState(scenario.location);
  const [target, setTarget] = useState(scenario.target);
  const [targetDate, setTargetDate] = useState(scenario.targetDate);
  const [stage, setStage] = useState(-1);
  const [success, setSuccess] = useState(false);
  useEffect(() => { setLocation(scenario.location); setTarget(scenario.target); setTargetDate(scenario.targetDate); }, [scenario.id, scenario.location, scenario.target, scenario.targetDate]);
  const busy = stage >= 0;
  const dates = getAvailableTargetDates(location, target);
  const selectedScenario = getForecastScenario({ location, target, targetDate });
  const start = async () => {
    if (!selectedScenario || busy) return;
    setSuccess(false);
    for (let i = 0; i < stages.length; i += 1) {
      setStage(i);
      await new Promise((resolve) => window.setTimeout(resolve, 300));
    }
    generate(selectedScenario);
    setStage(-1);
    setSuccess(true);
  };
  const doReset = () => {
    reset(); setLocation("Delhi, India"); setTarget("Maximum Temperature"); setTargetDate("2026-09-29"); setStage(-1); setSuccess(false);
  };
  const selectClass = "mt-1.5 h-10 w-full rounded-lg border border-white/[0.09] bg-[#081525] px-3 text-xs text-slate-100 outline-none transition focus:border-sky-300/50 focus:ring-2 focus:ring-sky-300/15 disabled:cursor-not-allowed disabled:opacity-60";
  return <section aria-label="Forecast controls" className="mb-5 rounded-2xl border border-white/[0.08] bg-[#0b1728]/85 p-4 sm:p-5">
    <div className="mb-4 flex flex-wrap items-start justify-between gap-3"><div><h2 className="text-sm font-semibold text-slate-100">Forecast Engine</h2><p className="mt-1 text-[11px] text-slate-400">Choose a target date to review its prediction and range.</p></div><span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/15 bg-emerald-300/[0.05] px-2.5 py-1 text-[10px] text-emerald-200"><span className="h-1.5 w-1.5 rounded-full bg-emerald-300"/>Forecast Ready</span></div>
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-[1.1fr_1.4fr_1.2fr_0.9fr_auto_auto] xl:items-end">
      <label className="text-[10px] font-medium uppercase tracking-wider text-slate-400">Location<select className={selectClass} value={location} disabled={busy} onChange={(event) => setLocation(event.target.value)}>{getAvailableLocations().map((value) => <option key={value}>{value}</option>)}</select></label>
      <label className="text-[10px] font-medium uppercase tracking-wider text-slate-400">Target<select className={selectClass} value={target} disabled={busy} onChange={(event) => setTarget(event.target.value)}>{getAvailableTargets(location).map((value) => <option key={value}>{value}</option>)}</select></label>
      <label className="text-[10px] font-medium uppercase tracking-wider text-slate-400">Forecast Date<select className={selectClass} value={targetDate} disabled={busy} onChange={(event) => setTargetDate(event.target.value)}>{dates.map((value) => <option key={value} value={value}>{formatDate(`${value}T12:00:00+05:30`)}</option>)}</select></label>
      <div className="text-[10px] font-medium uppercase tracking-wider text-slate-400">Forecast Horizon<div className="mt-1.5 flex h-10 items-center rounded-lg border border-white/[0.06] bg-white/[0.025] px-3 text-xs normal-case tracking-normal text-slate-200">{selectedScenario?.horizon ?? "—"}</div></div>
      <button type="button" onClick={start} disabled={busy || !selectedScenario} aria-busy={busy} className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-sky-300 px-4 text-xs font-semibold text-slate-950 transition hover:bg-sky-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 disabled:cursor-wait disabled:opacity-70">{busy ? <LoaderCircle size={14} className="animate-spin"/> : <Play size={13} fill="currentColor"/>}{busy ? "Generating…" : "Generate Forecast"}</button>
      <button type="button" onClick={doReset} disabled={busy} className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-white/[0.1] px-3 text-xs text-slate-300 transition hover:bg-white/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 disabled:opacity-50"><RotateCcw size={13}/>Reset</button>
    </div>
    {busy && <div className="mt-4 rounded-lg border border-sky-300/[0.1] bg-sky-300/[0.035] p-3" role="status" aria-live="polite"><div className="mb-2 flex items-center justify-between text-[11px]"><span className="text-slate-200">{stages[stage]}…</span><span className="text-slate-400">{Math.round(((stage + 1) / stages.length) * 100)}%</span></div><div className="h-1 overflow-hidden rounded-full bg-white/[0.08]"><div className="h-full rounded-full bg-sky-300 transition-all duration-300" style={{ width: `${((stage + 1) / stages.length) * 100}%` }}/></div></div>}
    <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[10px]" aria-live="polite">{success && <p role="status" className="inline-flex items-center gap-1.5 text-emerald-200"><Check size={12}/>Forecast generated successfully</p>}<p className="ml-auto text-slate-400">{generatedAt ? `Generated at ${formatDateTime(generatedAt)}` : `Default issue date · ${formatDate(`${PROTOTYPE_REFERENCE_DATE}T12:00:00+05:30`)}`}</p></div>
  </section>;
}
