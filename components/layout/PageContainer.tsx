import type { ReactNode } from "react";
export function PageContainer({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return <main className="mx-auto w-full max-w-[1450px] px-4 py-7 pb-24 sm:px-6 md:px-9 md:py-8 md:pb-12"><div className="mb-7"><h1 className="text-[23px] font-semibold tracking-[-.03em] text-slate-50">{title}</h1><p className="mt-1.5 text-[13px] text-slate-400">{description}</p></div>{children}</main>;
}
