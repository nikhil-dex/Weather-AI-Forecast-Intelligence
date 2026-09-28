import { Info } from "lucide-react";
import { Panel } from "@/components/ui/Panel";
export function LimitationsCard({ items }: { items: string[] }) { return <Panel title="Forecast limitations" tag="INTENDED USE"><ul className="space-y-2.5">{items.map(item => <li key={item} className="flex gap-2.5 text-[11px] leading-5 text-slate-400"><Info size={13} className="mt-0.5 shrink-0 text-sky-300/80"/>{item}</li>)}</ul><p className="mt-4 border-t border-white/[0.07] pt-3 text-[10px] leading-4 text-slate-500">Forecast uncertainty should be considered when interpreting results.</p></Panel>; }
