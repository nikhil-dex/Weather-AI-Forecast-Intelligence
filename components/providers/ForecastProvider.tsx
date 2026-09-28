"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { defaultForecastScenario, forecastScenarios, type ForecastScenario } from "@/lib/forecast/forecast-data";

type ForecastState = { scenario: ForecastScenario; generatedAt: string | null; generate: (scenario: ForecastScenario) => void; reset: () => void };
const ForecastContext = createContext<ForecastState | null>(null);
const STORAGE_KEY = "weather-ai-current-forecast";

export function ForecastProvider({ children }: { children: React.ReactNode }) {
  const [scenario, setScenario] = useState(defaultForecastScenario);
  const [generatedAt, setGeneratedAt] = useState<string | null>(null);
  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    try {
      const value = JSON.parse(saved) as { id?: string; generatedAt?: string };
      const restored = forecastScenarios.find((item) => item.id === value.id);
      if (restored) setScenario(restored);
      if (value.generatedAt) setGeneratedAt(value.generatedAt);
    } catch { sessionStorage.removeItem(STORAGE_KEY); }
  }, []);
  const generate = useCallback((next: ForecastScenario) => {
    const at = new Date().toISOString();
    setScenario(next);
    setGeneratedAt(at);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ id: next.id, generatedAt: at }));
  }, []);
  const reset = useCallback(() => {
    setScenario(defaultForecastScenario);
    setGeneratedAt(null);
    sessionStorage.removeItem(STORAGE_KEY);
  }, []);
  const value = useMemo(() => ({ scenario, generatedAt, generate, reset }), [scenario, generatedAt, generate, reset]);
  return <ForecastContext.Provider value={value}>{children}</ForecastContext.Provider>;
}
export function useForecast() {
  const context = useContext(ForecastContext);
  if (!context) throw new Error("useForecast must be used within ForecastProvider");
  return context;
}
