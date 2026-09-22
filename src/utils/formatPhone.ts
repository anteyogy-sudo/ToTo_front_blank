export const formatPhone = (phone: string) => {
    const digits = phone.replace(/\D/g, '');

    const match = digits.match(/^8(\d{3})(\d{3})(\d{2})(\d{2})$/);

    if (match) {
        const [, code, first, second, third] = match;
        return `8 (${code}) ${first}-${second}-${third}`;
    }

    return phone;
};
