import { CropMethods } from '../../Forms';

export interface ImageFieldSettingsFormState {
	minHeight: number;
	minWidth: number;
	cropOptions: CropOption[];
}

export interface CropOption {
	id: string;
	name: string;
	guideline: string;
	method: CropMethods;
	ratioDimensions?: RatioDimensions;
	boundsDimensions?: BoundsDimensions;
	exactDimensions?: ExactDimensions;
}

export interface BoundsDimensions {
	minWidth: number;
	minHeight: number;
	maxWidth: number;
	maxHeight: number;
}

export interface ExactDimensions {
	width: number;
	height: number;
}

export interface RatioDimensions {
	x: number;
	y: number;
}
