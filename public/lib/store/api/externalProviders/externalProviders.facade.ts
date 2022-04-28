import { ExternalProviderOptions } from './externalProviders.model';
import { ExternalProvidersQuery, externalProvidersQuery } from './externalProviders.query';
import { ExternalProvidersStore, externalProvidersStore } from './externalProviders.store';

export class ExternalProvidersFacade {
	constructor(private store: ExternalProvidersStore, private query: ExternalProvidersQuery) {}

	public readonly all$ = this.query.all$;

	public registerProvider(name: string, options: ExternalProviderOptions): void {
		this.store.add({
			...options,
			target: name,
			type: 'external',
		});
	}
}

export const externalProvidersFacade = new ExternalProvidersFacade(
	externalProvidersStore,
	externalProvidersQuery
);
