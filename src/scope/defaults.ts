import Errorish from '~/Errorish';
import { CoreOptions } from '~/types';

/**
 * Default values for error creation and normalization when an options object is not passed or lacks a particular property. They can be reset via `scope.set`. See `ICoreOptions`.
 */
const defaults: Required<CoreOptions> = {
  name: 'Error',
  message: 'An error occurred',
  Errorish: Errorish,
  normalize: true,
  capture: true,
  allow: ['string'],
  Error: Error
};

export default defaults;
