export function stringify(message: any): string | void {
  if (typeof message === 'string') return message;

  try {
    return JSON.stringify(message);
  } catch (e) {}
}
