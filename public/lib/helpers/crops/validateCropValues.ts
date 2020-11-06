import { CropValues } from '../../components';

export const validateCropValues = (cropValues: CropValues | undefined): boolean => {
	const isInvalid = !cropValues?.width && !cropValues?.height && !cropValues?.x && !cropValues?.y;
	return !isInvalid;
};
