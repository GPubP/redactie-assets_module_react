import { CropOption, CropValues, ImageFieldAsset, TransformValues } from '../../components';

export interface ImageCrops {
	[key: string]: ImageCropValue;
}

export interface ImageCropValue {
	asset?: ImageFieldAsset;
	cropValues: CropValues;
	transformValues: TransformValues;
	settings: CropOption;
}

export interface TemporaryCrop {
	cropValues: CropValues;
	transformValues: TransformValues;
}
