import Errorish from '~/Errorish';
import { ICoreOptions } from '~/types';

/**
 * Default values for error creation and normalization when an options object is not passed or lacks a particular property. They can be reset via `scope.set`. See `ICoreOptions`.
 */
const defaults: Required<ICoreOptions> = {
  name: 'Error',
  message: 'An error ocurred',
  Errorish: Errorish,
  normalize: true,
  capture: true,
  allow: ['string'],
  Error: Error
};

export default defaults;
