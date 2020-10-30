import kebabCase from 'lodash.kebabcase';

import { CropMethods } from '../../assets.types';
import { AssetCropsRequest } from '../../services/assets';
import { CROP_DIMENSIONS_MAP, CROP_TYPE_MAP } from '../../views/ImageCrop/ImageCrop.const';
import { ImageCrops } from '../../views/ImageCrop/ImageCrop.types';

export const parseCropsRequest = (crops: ImageCrops): Omit<AssetCropsRequest, 'uuid'> => {
	return Object.keys(crops).reduce(
		(acc, curr) => {
			const { settings, cropValues, transformValues } = crops[curr];
			const safeLabel = kebabCase(settings.name);
			let cropDimensions = {};
			if (settings.method === CropMethods.BOUNDS || settings.method === CropMethods.EXACT) {
				cropDimensions = settings[CROP_DIMENSIONS_MAP[settings.method]] || {};
			}

			return {
				...acc,
				cropData: {
					...acc.cropData,
					[safeLabel]: {
						...cropValues,
						...transformValues,
					},
				},
				settings: acc.settings.concat({
					...cropDimensions,
					type: CROP_TYPE_MAP[settings.method],
					label: settings.name,
					safeLabel,
				}),
			};
		},
		{
			cropData: {},
			settings: [],
		} as Omit<AssetCropsRequest, 'uuid'>
	);
};
