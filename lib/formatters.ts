export const formatTemperature = (value: number) => `${value.toFixed(1)}°C`;
export const formatDateTime = (value: string) => new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
