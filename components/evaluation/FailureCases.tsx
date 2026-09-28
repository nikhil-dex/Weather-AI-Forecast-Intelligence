import { Fragment } from "react";
import type { FailureCase } from "@/types/evaluation";
import { Panel } from "@/components/ui/Panel";

export function FailureCases({ title, description, cases }: { title: string; description: string; cases: FailureCase[] }) {
  return <Panel title={title} subtitle={description} tag="CASE REVIEW">
    <div className="overflow-x-auto">
      <table className="w-full min-w-[300px] border-collapse text-left text-[11px]">
        <thead><tr className="border-b border-white/[0.07] text-[9px] font-medium uppercase tracking-wider text-slate-400"><th scope="col" className="pb-2 pr-2">Date</th><th scope="col" className="pb-2 pr-2">Forecast</th><th scope="col" className="pb-2 pr-2">Observed</th><th scope="col" className="pb-2 text-right">Error</th></tr></thead>
        <tbody>{cases.map(item=><Fragment key={item.date}><tr className="border-b border-white/[0.05]"><th scope="row" className="py-3 pr-2 text-left font-normal text-slate-400">{item.date}</th><td className="py-3 pr-2 text-slate-200">{item.forecast.toFixed(1)}°C</td><td className="py-3 pr-2 text-slate-200">{item.actual.toFixed(1)}°C</td><td className={`py-3 text-right ${Math.abs(item.error)>3?"text-rose-300":"text-emerald-300"}`}>{item.error>0?"+":""}{item.error.toFixed(1)}°C</td></tr><tr className="border-b border-white/[0.05] last:border-0"><td colSpan={4} className="pb-2 text-[9px] leading-4 text-slate-400">{item.note}</td></tr></Fragment>)}</tbody>
      </table>
    </div>
  </Panel>;
}
