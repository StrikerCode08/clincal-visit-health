export const datePresets = [
  { value: "today", label: "Today" },
  { value: "yesterday", label: "Yesterday" },
  { value: "3days", label: "Last 3 days" },
  { value: "week", label: "Last 7 days" },
  { value: "custom", label: "Pick a date" }
];

export function resolveVisitedAt(preset, customDate) {
  const now = new Date();
  const dateOnly = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 9, 0, 0);

  switch (preset) {
    case "today":
      return dateOnly(now);
    case "yesterday":
      return dateOnly(new Date(now.getTime() - 1000 * 60 * 60 * 24));
    case "3days":
      return dateOnly(new Date(now.getTime() - 1000 * 60 * 60 * 24 * 3));
    case "week":
      return dateOnly(new Date(now.getTime() - 1000 * 60 * 60 * 24 * 7));
    case "custom":
      return customDate ? new Date(`${customDate}T09:00:00`) : undefined;
    default:
      return undefined;
  }
}
