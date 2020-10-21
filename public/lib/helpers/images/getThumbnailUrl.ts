import Core from '@redactie/redactie-core';

import { ASSETS_REQUEST_PREFIX_URL } from '../../services/api/api.service.const';

const CoreConfig = Core.config.getValue('core') || {};

export const getThumbnailUrl = (thumbnailId: string | null): string => {
	if (!thumbnailId) {
		return '';
	}

	const baseUrl = `${window.location.origin}${ASSETS_REQUEST_PREFIX_URL}assets`;

	return `${baseUrl}/${thumbnailId}/file?x-tenant-id=${CoreConfig.tenantId}`;
};
