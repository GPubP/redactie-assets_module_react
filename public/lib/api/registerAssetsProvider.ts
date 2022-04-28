import { ExternalProviderOptions, externalProvidersFacade } from '../store/api/externalProviders';

/**
 * Register a external assets provider
 * @param name A unique name to identity your external assets provider
 * @param options options to setup your external assets provider
 * @returns void
 */
export const registerAssetsProvider = (name: string, options: ExternalProviderOptions): void =>
	externalProvidersFacade.registerProvider(name, options);
