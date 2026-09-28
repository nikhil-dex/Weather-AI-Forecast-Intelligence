"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CloudSun, LayoutDashboard, Wind, ChartNoAxesCombined, Database, CircleHelp } from "lucide-react";
import { forecast } from "@/data/mockForecast";
import { APP_NAME } from "@/lib/constants";

const links = [
  { href: "/", label: "Overview", icon: LayoutDashboard }, { href: "/forecast", label: "Forecast", icon: Wind },
  { href: "/evaluation", label: "Evaluation", icon: ChartNoAxesCombined }, { href: "/data-model", label: "Data & Model", icon: Database }
];
export function Sidebar() {
  const path = usePathname();
  return <><aside className="sticky top-0 hidden h-screen min-h-screen w-[250px] shrink-0 border-r border-white/[0.07] bg-[#091422] px-4 py-6 md:flex md:flex-col">
    <div className="mb-10 flex items-center gap-3 px-2"><span className="grid h-10 w-10 place-items-center rounded-xl border border-sky-300/15 bg-sky-400/[0.09] text-sky-300"><CloudSun size={21}/></span><div><p className="text-sm font-semibold tracking-tight">{APP_NAME}</p><p className="mt-0.5 text-[11px] text-slate-400">Weather forecasting intelligence</p></div></div>
    <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[.16em] text-slate-400">Workspace</p>
    <nav aria-label="Main navigation" className="space-y-1">{links.map(({href,label,icon:Icon}) => { const active = path === href; return <Link key={href} href={href} aria-current={active ? "page" : undefined} className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 ${active ? "bg-sky-400/[0.11] text-sky-200" : "text-slate-400 hover:bg-white/[0.04] hover:text-slate-100"}`}><Icon size={17} strokeWidth={1.8}/>{label}{active && <span className="absolute bottom-2 left-0 top-2 w-[2px] rounded-r bg-sky-400"/>}</Link>; })}</nav>
    <div className="mt-auto space-y-5"><div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-3.5"><div className="mb-3 flex items-center justify-between"><span className="text-[10px] font-semibold tracking-[.14em] text-slate-400">MODEL CONFIGURATION</span><span className="h-1.5 w-1.5 rounded-full bg-sky-300"/></div><p className="text-xs font-medium text-slate-200">{forecast.model}</p><p className="mt-1 text-[10px] text-slate-400">Version {forecast.modelVersion}</p></div><div className="flex gap-2.5 px-2 text-[10px] leading-4 text-slate-400"><CircleHelp size={14} className="mt-0.5 shrink-0"/><p>Forecast uncertainty should be considered when interpreting results.</p></div></div>
  </aside><nav aria-label="Mobile navigation" className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 border-t border-white/[0.08] bg-[#091422]/95 px-2 pb-[max(8px,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl md:hidden">{links.map(({href,label,icon:Icon}) => <Link key={href} href={href} aria-current={path===href?"page":undefined} className={`flex flex-col items-center gap-1 py-1 text-[10px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300 ${path===href ? "text-sky-300" : "text-slate-400"}`}><Icon size={18} strokeWidth={1.8}/>{label}</Link>)}</nav></>;
}
