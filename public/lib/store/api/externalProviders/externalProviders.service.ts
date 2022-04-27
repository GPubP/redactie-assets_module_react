import { ID } from '@datorama/akita';

import { ExternalProviderOptions } from './externalProviders.model';
import { ExternalProvidersStore, externalProvidersStore } from './externalProviders.store';

export class ExternalProvidersService {
	constructor(private store: ExternalProvidersStore) {}

	public registerProviders(name: string, options: ExternalProviderOptions): void {
		this.store.add({
			...options,
			target: name,
			type: 'external',
		});
	}

	public activate(name: ID): void {
		this.store.setActive(name);
	}
}

export const externalProvidersService = new ExternalProvidersService(externalProvidersStore);
