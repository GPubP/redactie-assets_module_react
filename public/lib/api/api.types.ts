import { registerAssetsProvider } from './registerAssetsProvider';

export interface AssetsAPI {
	registerAssetsProvider: typeof registerAssetsProvider;
}
