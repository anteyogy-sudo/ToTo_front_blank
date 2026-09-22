export const getGmailComposeUrl = (email: string, subject?: string, body?: string): string => {
    const params = new URLSearchParams({
        to: email,
        fs: '1',
        tf: 'cm',
        source: 'mailto',
    });
    if (subject) params.append('su', subject);
    if (body) params.append('body', body);
    return `https://mail.google.com/mail/u/0/?${params.toString()}`;
};

export const convertMailtoToGmail = (mailtoHref: string): string => {
    const match = mailtoHref.match(/^mailto:([^?]+)(\?.*)?$/);
    if (!match) return mailtoHref;
    const email = match[1];
    const query = match[2] || '';
    return getGmailComposeUrl(email);
};

export const getYandexComposeUrl = (email: string, subject?: string, body?: string): string => {
    const params = new URLSearchParams({
        to: email,
    });
    if (subject) params.append('subject', subject);
    if (body) params.append('body', body);
    return `https://mail.yandex.ru/compose?${params.toString()}`;
};
