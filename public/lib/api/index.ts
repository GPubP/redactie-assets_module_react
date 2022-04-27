import Core from '@redactie/redactie-core';

import { AssetsAPI } from './api.types';
import { registerAssetsProvider } from './registerAssetsProvider';

const API: AssetsAPI = {
	registerAssetsProvider,
};

export const registerAssetsAPI = (): void => {
	Core.modules.exposeModuleApi('assets-module', API);
};

export { API };
