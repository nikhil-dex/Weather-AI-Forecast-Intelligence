"use client";
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { defaultForecastScenario, type ForecastScenario } from "@/lib/forecast/forecast-data";

type ForecastState = { scenario: ForecastScenario; generatedAt: string | null; generate: (scenario: ForecastScenario) => void; reset: () => void };
const ForecastContext = createContext<ForecastState | null>(null);
export function ForecastProvider({ children }: { children: React.ReactNode }) {
  const [scenario, setScenario] = useState(defaultForecastScenario);
  const [generatedAt, setGeneratedAt] = useState<string | null>(null);
  const generate = useCallback((next: ForecastScenario) => {
    const at = new Date().toISOString();
    setScenario(next);
    setGeneratedAt(at);
  }, []);
  const reset = useCallback(() => {
    setScenario(defaultForecastScenario);
    setGeneratedAt(null);
  }, []);
  const value = useMemo(() => ({ scenario, generatedAt, generate, reset }), [scenario, generatedAt, generate, reset]);
  return <ForecastContext.Provider value={value}>{children}</ForecastContext.Provider>;
}
export function useForecast() {
  const context = useContext(ForecastContext);
  if (!context) throw new Error("useForecast must be used within ForecastProvider");
  return context;
}
