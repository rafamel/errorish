import ensure from '~/ensure';
import throws from '~/throws';
import rejects from '~/rejects';
import normalize from '~/normalize';
import { IOfType, IScope, ICoreOptions } from '~/types';

export const root: IScope = { name: null, ensure, throws, rejects, normalize };
export const scopes: IOfType<IScope> = {};
export const values: IOfType<ICoreOptions> = {};
