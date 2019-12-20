import { CoreOptions } from '~/types';

export default function stringify(
  message: any,
  options: Required<CoreOptions>
): string {
  if (typeof message === 'string') return message;

  try {
    return JSON.stringify(message);
  } catch (e) {
    return options.message;
  }
}
