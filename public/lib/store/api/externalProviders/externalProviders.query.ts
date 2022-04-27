import { QueryEntity } from '@datorama/akita';

import { ExternalProvidersState } from './externalProviders.model';
import { ExternalProvidersStore, externalProvidersStore } from './externalProviders.store';

export class ExternalProvidersQuery extends QueryEntity<ExternalProvidersState> {
	public all$ = this.selectAll();

	constructor(protected store: ExternalProvidersStore) {
		super(store);
	}
}

export const externalProvidersQuery = new ExternalProvidersQuery(externalProvidersStore);
