import { ImageSelect } from '../components';

import { registerAssetsProvider } from './registerAssetsProvider';

export interface AssetsAPI {
	registerAssetsProvider: typeof registerAssetsProvider;
	ImageSelect: typeof ImageSelect;
}

export { ImageSelectProps } from '../components';
