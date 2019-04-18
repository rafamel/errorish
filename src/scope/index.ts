import ensure from '~/ensure';
import throws from '~/throws';
import rejects from '~/rejects';
import normalize from '~/normalize';
import defaults from './defaults';
import { IScope, ICoreOptions } from '~/types';
import { root, scopes, values } from './values';

/**
 * Allows the creation of specific scopes with different sets of default options. If a particular option is nor defined for a scope, it will fall back to the root scope value for that option -the root scope is the one the `ensure`, `throws`, `rejects`, and `normalize` functions as exported from `errorish` entry point belong to by default.
 */
const scope = {
  /**
   * Gets a scope by name -it is created if it doesn't exist. If no name is passed, the root scope will be returned.
   */
  get(name?: string): IScope {
    if (!name) return root;

    if (!scopes.hasOwnProperty(name)) {
      if (!values.hasOwnProperty(name)) values[name] = {};
      const options = values[name];

      scopes[name] = {
        name,
        ensure(...args: any[]) {
          args[1] = Object.assign({}, options, args[1]);
          return ensure(args[0], ...args.slice(1));
        },
        throws(...args: any[]) {
          args[1] = Object.assign({}, options, args[1]);
          return throws(args[0], ...args.slice(1));
        },
        async rejects(...args: any[]) {
          args[1] = Object.assign({}, options, args[1]);
          return rejects(args[0], ...args.slice(1));
        },
        normalize(...args: any[]) {
          args[1] = Object.assign({}, options, args[1]);
          return normalize(args[0], ...args.slice(1));
        }
      };
    }

    return scopes[name];
  },
  /**
   * Sets default options for a scope, taking the name of the scope as the first argument, and the `ICoreOptions` options as the second. If no name is passed and a single `ICoreOptions` argument is in its place, it will set the defaults for the root scope. It will also return the scope.
   */
  set(...args: [string, ICoreOptions] | [ICoreOptions]): IScope {
    const name = args.find((x) => typeof x === 'string') as string | undefined;
    const options = args.find((x) => typeof x === 'object') as ICoreOptions;

    if (!name) Object.assign(defaults, options);
    else {
      if (!values.hasOwnProperty(name)) values[name] = {};
      Object.assign(values[name], options);
    }

    return scope.get(name);
  }
};

export { scope as default };
