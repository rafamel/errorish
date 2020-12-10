import { TypeGuard } from 'type-core';

export function stringify(message: any): string {
  try {
    if (message === undefined) return '';
    if (TypeGuard.isPrimitive(message)) return String(message);
    if (TypeGuard.isFunction(message)) return `function ${message.name}`.trim();
    return JSON.stringify(message);
  } catch (_) {
    return '';
  }
}
