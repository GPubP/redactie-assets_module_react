export interface ImageFieldSettingsFormState {
	minHeight: number;
	minWidth: number;
	cropOptions: CropOption[];
}

export interface CropOption {
	name: string;
	guideline: string;
	method: string;
	ratioDimensions?: {
		x: number;
		y: number;
	};
	boundsDimensions?: {
		minWidth: number;
		minHeight: number;
		maxWidth: number;
		maxHeight: number;
	};
	exactDimensions?: {
		width: number;
		height: number;
	};
}

export interface CropTableRow extends CropOption {
	id: string;
}

export enum CropMethods {
	FREE = 'free',
	EXACT = 'exact',
	BOUNDS = 'bounds',
	RATIO = 'ratio',
}
