import kebabCase from 'lodash.kebabcase';
import { isEmpty } from 'ramda';

import { CropOption, ImageFieldValue } from '../../components';
import { ImageCrops } from '../../views/ImageCrop/ImageCrop.types';

export const parseInitialCrops = (
	imageFieldCrops: ImageFieldValue['crops'] = {},
	cropOptions: CropOption[]
): ImageCrops => {
	return Object.keys(imageFieldCrops).reduce((acc, curr) => {
		const crops = !isEmpty(imageFieldCrops) ? imageFieldCrops : null;
		const settings = cropOptions.find(option => kebabCase(option.name) === curr);

		if (!crops || !settings) {
			return acc;
		}

		return {
			...acc,
			[settings.id]: {
				...crops[curr],
				settings,
			},
		};
	}, {});
};
