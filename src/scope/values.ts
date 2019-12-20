import ensure from '~/ensure';
import throws from '~/throws';
import rejects from '~/rejects';
import normalize from '~/normalize';
import { Scope, CoreOptions } from '~/types';

export const root: Scope = { name: null, ensure, throws, rejects, normalize };
export const scopes: Record<string, Scope> = {};
export const values: Record<string, CoreOptions> = {};
