import { ICoreOptions } from '~/types';

export default function stringify(
  message: any,
  options: Required<ICoreOptions>
): string {
  if (typeof message === 'string') return message;

  try {
    return JSON.stringify(message);
  } catch (e) {
    return options.message;
  }
}
