"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { defaultForecastScenario, getForecastScenarios, type ForecastScenario } from "@/lib/forecast/forecast-data";
import { toLocalDateKey } from "@/lib/forecast/date-utils";

type ForecastState = {
  scenario: ForecastScenario;
  scenarios: ForecastScenario[];
  issueDate: string | null;
  generatedAt: string | null;
  generate: (scenario: ForecastScenario) => void;
  reset: () => void;
};
const ForecastContext = createContext<ForecastState | null>(null);

export function ForecastProvider({ children }: { children: React.ReactNode }) {
  const [issueDate, setIssueDate] = useState<string | null>(null);
  const [selectedDayOffset, setSelectedDayOffset] = useState(1);
  const [generatedAt, setGeneratedAt] = useState<string | null>(null);
  useEffect(() => {
    const refreshLocalDate = () => setIssueDate(toLocalDateKey(new Date()));
    refreshLocalDate();
    const timer = window.setInterval(refreshLocalDate, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const scenarios = useMemo(() => getForecastScenarios(issueDate), [issueDate]);
  const scenario = scenarios.find((item) => item.dayOffset === selectedDayOffset) ?? defaultForecastScenario;
  const generate = useCallback((next: ForecastScenario) => {
    const now = new Date();
    setIssueDate(toLocalDateKey(now));
    setSelectedDayOffset(next.dayOffset);
    setGeneratedAt(now.toISOString());
  }, []);
  const reset = useCallback(() => {
    setIssueDate(toLocalDateKey(new Date()));
    setSelectedDayOffset(1);
    setGeneratedAt(null);
  }, []);
  const value = useMemo(() => ({ scenario, scenarios, issueDate, generatedAt, generate, reset }), [scenario, scenarios, issueDate, generatedAt, generate, reset]);
  return <ForecastContext.Provider value={value}>{children}</ForecastContext.Provider>;
}
export function useForecast() {
  const context = useContext(ForecastContext);
  if (!context) throw new Error("useForecast must be used within ForecastProvider");
  return context;
}
