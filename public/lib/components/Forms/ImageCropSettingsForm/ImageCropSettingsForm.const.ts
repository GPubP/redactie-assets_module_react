import { object, string } from 'yup';

import { CropMethods } from '../../../assets.types';

import { CropMethodFieldOption } from './ImageCropSettingsForm.types';

export const IMAGE_CROP_SETTINGS_VALIDATION_SCHEMA = object().shape({
	name: string().required('Naam is een verplicht veld'),
	guideline: string().required('Richtlijn is een verplicht veld'),
	method: string().required('Methode is een verplicht veld'),
});

export const CROP_METHODS: CropMethodFieldOption[] = [
	{
		key: '1',
		value: CropMethods.FREE,
		label: 'Vrije crop',
		guideline: 'De afbeelding mag vrij bijgesneden worden.',
	},
	{
		key: '2',
		value: CropMethods.EXACT,
		label: 'Exact crop',
		guideline:
			'De afbeelding wordt bijgesneden aan de hand van de opgegeven hoogte en breedte.',
	},
	{
		key: '3',
		value: CropMethods.BOUNDS,
		label: 'Begrensde crop',
		guideline: 'De afbeelding mag vrij bijgesneden worden binnen bepaalde grenzen.',
	},
	{
		key: '4',
		value: CropMethods.RATIO,
		label: 'Ratio crop',
		guideline:
			'De afbleelding wordt bijgesneden aan de hand van het opgegeven formaat (bv: 16:9)',
	},
];
