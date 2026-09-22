export function formatSchedule(schedule: string): string {
  const daysMap: Record<string, string> = {
    ПН: "Пн",
    ВТ: "Вт",
    СР: "Ср",
    ЧТ: "Чт",
    ПТ: "Пт",
    СБ: "Сб",
    ВС: "Вс",
  };

  const orderedDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

  // Step 1: Parse entries into objects with full info
  const entries = schedule
    .split(";")
    .filter(Boolean)
    .map((entry) => {
      const [dayRaw, time] = entry.trim().split(" ");
      const day = daysMap[dayRaw];
      return { day, time };
    });

  // Step 2: Sort entries by correct order
  entries.sort(
    (a, b) => orderedDays.indexOf(a.day) - orderedDays.indexOf(b.day)
  );

  // Step 3: Group by identical time ranges
  const groups: { days: string[]; time: string }[] = [];
  for (const entry of entries) {
    const lastGroup = groups[groups.length - 1];
    if (lastGroup && lastGroup.time === entry.time) {
      lastGroup.days.push(entry.day);
    } else {
      groups.push({ days: [entry.day], time: entry.time });
    }
  }

  // Step 4: Format grouped entries
  return groups
    .map(({ days, time }) => {
      const label =
        days.length > 1 ? `${days[0]}-${days[days.length - 1]}` : days[0];
      return `${label}: с ${time.replace("-", " до ")}`;
    })
    .join(", ");
}
