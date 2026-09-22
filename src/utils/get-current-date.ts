export function getCurrentDateISOWithOffset(): string {
  const now = new Date();
  now.setHours(now.getHours() + 3);
  return now.toISOString().replace("Z", getTimezoneOffset(now));
}

export function getDatePlusDaysISOWithOffset(days: number): string {
  const now = new Date();
  now.setDate(now.getDate() + days);
  now.setHours(now.getHours() + 3);
  return now.toISOString().replace("Z", getTimezoneOffset(now));
}

function getTimezoneOffset(date: Date): string {
  const offset = -date.getTimezoneOffset();
  const sign = offset >= 0 ? "+" : "-";
  const pad = (n: number) => `${Math.floor(Math.abs(n))}`.padStart(2, "0");
  return `${sign}${pad(offset / 60)}:${pad(offset % 60)}`;
}
