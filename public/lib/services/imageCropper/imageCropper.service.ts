import { CropMethods } from '../../assets.types';
import { BoundsDimensions, CropOption, ExactDimensions } from '../../components';

export class ImageCropperService {
	public calculateAspectRatio(cropData: CropOption): number {
		switch (cropData.method) {
			case CropMethods.BOUNDS:
				if (!cropData.lockRatio || !cropData.boundsDimensions) {
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

	public getMinCropSize(cropData: CropOption): { minWidth: number; minHeight: number } {
		switch (cropData.method) {
			case CropMethods.EXACT: {
				const { width, height } = this.getExactDimensions(cropData.exactDimensions);

				return {
					minWidth: width,
					minHeight: height,
				};
			}
			case CropMethods.BOUNDS: {
				const { minWidth, minHeight } = this.getBoundsDimensions(cropData.boundsDimensions);

				return { minWidth, minHeight };
			}
			default:
				return { minWidth: 0, minHeight: 0 };
		}
	}

	public getRatioLabel(cropData: CropOption | null): string {
		const defaultLabel = 'Vrije verhouding';

		if (!cropData) {
			return defaultLabel;
		}

		switch (cropData.method) {
			case CropMethods.BOUNDS: {
				const { minWidth, minHeight } = this.getBoundsDimensions(cropData.boundsDimensions);
				if (!minWidth || !minHeight) {
					return defaultLabel;
				}
				return `Min. ${minWidth} * ${minHeight}`;
			}
			case CropMethods.EXACT: {
				const { width, height } = this.getExactDimensions(cropData.exactDimensions);
				return `${width} * ${height}`;
			}
			case CropMethods.FREE:
				return defaultLabel;
			case CropMethods.RATIO:
				if (!cropData.ratioDimensions) {
					return 'Vrije ratio';
				}
				return `${cropData.ratioDimensions.x}:${cropData.ratioDimensions.y}`;
			default:
				return defaultLabel;
		}
	}

	public getBoundsDimensions(dimensions?: BoundsDimensions): BoundsDimensions {
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
