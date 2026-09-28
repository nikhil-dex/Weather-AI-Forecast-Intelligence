import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { ForecastProvider } from "@/components/providers/ForecastProvider";
export const metadata: Metadata = { title: "Weather AI | Forecast Intelligence", description: "Weather forecasting interface with future temperature scenarios, uncertainty ranges, and historical evaluation." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><ForecastProvider><div className="min-h-screen md:flex"><Sidebar/><div className="min-w-0 flex-1"><Header/>{children}</div></div></ForecastProvider></body></html>; }
