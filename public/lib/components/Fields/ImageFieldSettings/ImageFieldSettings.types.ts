export interface ImageFieldSettingsFormState {
	minHeight: number;
	minWidth: number;
	cropOptions: CropOption[];
}

export interface CropOption {
	id: string;
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
