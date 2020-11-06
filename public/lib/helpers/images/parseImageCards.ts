import { ImageUploadConfig } from '../../components';
import { AssetMetaData, AssetResponse } from '../../services/assets';
import { AssetSelectItem } from '../../views/ImageSelection/ImageSelection.types';
import { parseAllowedFileTypes, validateFileType } from '../files';

import { getAssetUrl } from './getAssetUrl';

const validateImageSize = (
	{ width = 0, height = 0 }: AssetMetaData,
	{ minWidth, minHeight }: { minWidth: number; minHeight: number }
): boolean => {
	return width >= minWidth && height >= minHeight;
};

export const parseImageCards = (
	config: ImageUploadConfig,
	assets: AssetResponse[] | undefined
): AssetSelectItem[] => {
	if (!assets || assets.length === 0) {
		return [];
	}

	const { allowedFileTypes, imageConfig = { minWidth: 1, minHeight: 1 } } = config;
	const { minWidth, minHeight } = imageConfig;

	return assets.map(({ data, uuid }) => {
		const disabled =
			!validateFileType(parseAllowedFileTypes(allowedFileTypes), data.file) ||
			!validateImageSize(data.metaData, { minWidth, minHeight });

		return {
			uuid,
			data,
			disabled,
			src: getAssetUrl(data.thumbnail),
			title: data.name,
		};
	});
};
