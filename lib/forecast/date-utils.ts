export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function toLocalDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function parseLocalDateKey(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function formatForecastDate(value: string, dayOffset: number, style: "long" | "short" = "long"): string {
  if (!value) return dayOffset === 0 ? "Today" : dayOffset === 1 ? "Tomorrow" : `+${dayOffset} days`;
  const date = parseLocalDateKey(value);
  return new Intl.DateTimeFormat("en-IN", {
    day: style === "long" ? "2-digit" : "numeric",
    month: "short",
    ...(style === "long" ? { year: "numeric" } : {}),
  }).format(date);
}
