export const groupSchedule = (scheduleStr: string): string => {
    const daysOrder = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];

    const entries = scheduleStr
        .split(";")
        .filter(Boolean)
        .map((entry) => {
            const [day, time] = entry.trim().split(" ");
            return { day, time };
        });

    const timeGroups: Record<string, string[]> = {};
    for (const { day, time } of entries) {
        if (!timeGroups[time]) {
            timeGroups[time] = [];
        }
        timeGroups[time].push(day);
    }

    const groupConsecutiveDays = (days: string[]): string => {
        const indexes = days
            .map((day) => daysOrder.indexOf(day))
            .sort((a, b) => a - b);

        const ranges: string[] = [];
        let start = indexes[0];
        let end = indexes[0];

        for (let i = 1; i < indexes.length; i++) {
            if (indexes[i] === end + 1) {
                end = indexes[i];
            } else {
                ranges.push(formatRange(start, end));
                start = indexes[i];
                end = indexes[i];
            }
        }

        ranges.push(formatRange(start, end));
        return ranges.join(", ");
    };

    const formatRange = (startIdx: number, endIdx: number): string => {
        const startDay = daysOrder[startIdx];
        const endDay = daysOrder[endIdx];
        return startIdx === endIdx ? startDay : `${startDay}-${endDay}`;
    };

    const result = Object.entries(timeGroups).map(([time, days]) => {
        const grouped = groupConsecutiveDays(days);
        return `${grouped} ${time}`;
    });

    return result.join(";\n");
};


