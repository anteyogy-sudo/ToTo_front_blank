export function substringText(text: string, length: number) {
  const substringedText = text.substring(0, length);
  return text.length > length ? substringedText + "..." : text;
}
