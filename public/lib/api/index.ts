import Core from '@redactie/redactie-core';

import * as API from './api';

export const registerAssetsAPI = (): void => {
	Core.modules.exposeModuleApi('assets-module', API);
};
