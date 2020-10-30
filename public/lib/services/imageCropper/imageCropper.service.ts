import { CropMethods } from '../../assets.types';
import { BoundsDimensions, CropOption, ExactDimensions } from '../../components';

export class ImageCropperService {
	public calculateAspectRatio(cropData: CropOption): number {
		switch (cropData.method) {
			case CropMethods.BOUNDS:
				if (!cropData.boundsDimensions) {
					// TODO: If no lock ratio is available for bounds alse return NaN
					return NaN;
				}
				if (cropData.boundsDimensions.minWidth && cropData.boundsDimensions.minHeight) {
					return cropData.boundsDimensions.minWidth / cropData.boundsDimensions.minHeight;
				}
				if (cropData.boundsDimensions.maxWidth && cropData.boundsDimensions.maxHeight) {
					return cropData.boundsDimensions.maxWidth / cropData.boundsDimensions.maxHeight;
				}
				break;
			case CropMethods.EXACT:
				return cropData.exactDimensions
					? cropData.exactDimensions.width / cropData.exactDimensions.height
					: NaN;
			case CropMethods.RATIO:
				return cropData.ratioDimensions
					? cropData.ratioDimensions.x / cropData.ratioDimensions.y
					: NaN;
		}

		return NaN;
	}

	// Detect if the image is too small for the crop settings
	public validateSourceImage(cropData: CropOption, imageData: Cropper.ImageData): boolean {
		const exactDimensions = this.getExactDimensions(cropData.exactDimensions);
		const boundsDimensions = this.getBoundsDimensions(cropData.boundsDimensions);

		return (
			(cropData.method === CropMethods.EXACT &&
				imageData.naturalWidth >= exactDimensions.width &&
				imageData.naturalHeight >= exactDimensions.height) ||
			(cropData.method === CropMethods.BOUNDS &&
				imageData.naturalWidth >= boundsDimensions.minWidth &&
				imageData.naturalHeight >= boundsDimensions.minHeight) ||
			[CropMethods.EXACT, CropMethods.BOUNDS].indexOf(cropData.method) === -1
		);
	}

	public calculateMinCropSize(
		cropData: CropOption,
		imageData: Cropper.ImageData
	): { minWidth: number; minHeight: number } {
		const multipliers = this.getCropSizeMultiplier(imageData);

		switch (cropData.method) {
			case CropMethods.EXACT: {
				const exactDimensions = this.getExactDimensions(cropData.exactDimensions);

				return {
					minWidth: Math.floor(exactDimensions.width * multipliers.width),
					minHeight: Math.floor(exactDimensions.height * multipliers.height),
				};
			}
			case CropMethods.BOUNDS: {
				const boundsDimensions = this.getBoundsDimensions(cropData.boundsDimensions);

				return {
					minWidth: Math.floor(boundsDimensions.minWidth * multipliers.width),
					minHeight: Math.floor(boundsDimensions.minHeight * multipliers.height),
				};
			}
			default:
				return {
					minWidth: 0,
					minHeight: 0,
				};
		}
	}

	private getCropSizeMultiplier(imageData: Cropper.ImageData): any {
		return {
			width: imageData.width / imageData.naturalWidth,
			height: imageData.height / imageData.naturalHeight,
		};
	}

	private getBoundsDimensions(dimensions?: BoundsDimensions): BoundsDimensions {
		return {
			maxHeight: dimensions?.maxHeight || 0,
			maxWidth: dimensions?.maxWidth || 0,
			minHeight: dimensions?.minHeight || 0,
			minWidth: dimensions?.minWidth || 0,
		};
	}

	private getExactDimensions(dimensions?: ExactDimensions): ExactDimensions {
		return {
			height: dimensions?.height || 0,
			width: dimensions?.width || 0,
		};
	}
}

export const imageCropperService = new ImageCropperService();
