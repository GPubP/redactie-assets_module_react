import { ExternalProviderOptions, externalProvidersFacade } from '../store/api/externalProviders';

export const registerAssetsProvider = (name: string, options: ExternalProviderOptions): void =>
	externalProvidersFacade.registerProvider(name, options);
