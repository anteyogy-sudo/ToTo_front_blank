export function formatRussianPhone(phone: string): string {
    if (!phone || phone.length !== 11) return phone;

    const formatted = phone.replace(/^(\+7|7)/, '8');

    const code = formatted.slice(1, 5);
    const part1 = formatted.slice(5, 7);
    const part2 = formatted.slice(7, 9);
    const part3 = formatted.slice(9, 11);

    return `8 (${code}) ${part1}-${part2}-${part3}`;
}

