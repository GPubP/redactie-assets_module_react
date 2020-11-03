import { CropValues } from '../../components';

export const validateCropValues = (cropValues: CropValues | undefined): boolean => {
	return !!cropValues?.x && !!cropValues?.y && !!cropValues?.width && !!cropValues?.height;
};
