import Core from '@redactie/redactie-core';

import ImageSelect from '../components/ImageSelect/ImageSelect';

import { AssetsAPI } from './api.types';
import { registerAssetsProvider } from './registerAssetsProvider';

const API: AssetsAPI = {
	registerAssetsProvider,
	ImageSelect,
};

export const registerAssetsAPI = (): void => {
	Core.modules.exposeModuleApi('assets-module', API);
};

export { API };
