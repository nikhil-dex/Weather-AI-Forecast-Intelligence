import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
export const metadata: Metadata = { title: "Weather AI | Forecast Intelligence", description: "AI-powered weather forecasting intelligence and model evaluation." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><div className="min-h-screen md:flex"><Sidebar/><div className="min-w-0 flex-1"><Header/>{children}</div></div></body></html>; }
