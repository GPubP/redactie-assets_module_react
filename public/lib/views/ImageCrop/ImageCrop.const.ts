import { CropMethods } from '../../assets.types';

export const CROP_TYPE_MAP = {
	[CropMethods.BOUNDS]: 'boundary',
	[CropMethods.EXACT]: 'exact',
	[CropMethods.FREE]: 'free',
	[CropMethods.RATIO]: 'ratio',
} as const;

export const CROP_DIMENSIONS_MAP = {
	[CropMethods.BOUNDS]: 'boundsDimensions',
	[CropMethods.EXACT]: 'exactDimensions',
} as const;

export const ALERT_MESSAGES = {
	success: {
		title: 'Aangemaakt',
		message: `Je hebt nieuwe crops aangemaakt.`,
		type: 'success' as const,
	},
	danger: {
		title: 'Aanmaken mislukt',
		message: `Genereren van crops is mislukt.`,
		type: 'danger' as const,
	},
};
