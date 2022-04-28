import { EntityStore, StoreConfig } from '@datorama/akita';

import {
	createInitialExternalProvidersState,
	ExternalProviderModel,
	ExternalProvidersState,
} from './externalProviders.model';

@StoreConfig({ name: 'externalProviders', idKey: 'name' })
export class ExternalProvidersStore extends EntityStore<
	ExternalProvidersState,
	ExternalProviderModel
> {
	constructor() {
		super(createInitialExternalProvidersState());
	}
}

export const externalProvidersStore = new ExternalProvidersStore();
