import { Droplets, Gauge, Thermometer, Wind } from "lucide-react";
import type { WeatherContext as WeatherContextType } from "@/types/forecast";
const fields = [
  { key: "temperature", label: "Temperature", unit: "°C", icon: Thermometer },
  { key: "humidity", label: "Humidity", unit: "%", icon: Droplets },
  { key: "windSpeed", label: "Wind", unit: "km/h", icon: Wind },
  { key: "pressure", label: "Pressure", unit: "hPa", icon: Gauge }
] as const;
export function WeatherContext({ context }: { context: WeatherContextType }) { return <div className="mt-3"><div className="mb-1.5 flex flex-wrap items-center justify-between gap-1 px-1"><h2 className="text-[9px] font-semibold uppercase tracking-[.14em] text-slate-400">Forecast Scenario Context</h2><p className="text-[9px] text-slate-400">Associated context values · not current observations</p></div><section aria-label="Forecast scenario context variables" className="grid grid-cols-2 overflow-hidden rounded-xl border border-white/[0.07] bg-[#0b1728]/75 sm:grid-cols-4">{fields.map(({key,label,unit,icon:Icon},i)=><div key={key} className={`flex items-center gap-3 px-4 py-3.5 ${i%2===1?"border-l border-white/[0.06]":""} ${i>=2?"border-t border-white/[0.06] sm:border-t-0":""} ${i===2?"sm:border-l":""} ${i===3?"sm:border-l":""}`}><span className="text-slate-400"><Icon size={15}/></span><div><p className="text-[9px] uppercase tracking-wider text-slate-400">{label}</p><p className="mt-1 text-xs font-medium text-slate-200">{context[key]} <span className="text-[10px] font-normal text-slate-400">{unit}</span></p></div></div>)}</section></div>; }
