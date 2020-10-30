import { isNil } from '@datorama/akita';
import { BaseEntityQuery } from '@redactie/utils';
import { distinctUntilChanged, filter } from 'rxjs/operators';

import { AssetsState } from './assets.model';
import { assetsStore } from './assets.store';

export class AssetsQuery extends BaseEntityQuery<AssetsState> {
	public meta$ = this.select(state => state.meta).pipe(
		filter(meta => !isNil(meta), distinctUntilChanged())
	);
	public assets$ = this.selectAll();
	public asset$ = this.select(state => state.asset).pipe(
		filter(asset => !isNil(asset), distinctUntilChanged())
	);
}

export const assetsQuery = new AssetsQuery(assetsStore);
