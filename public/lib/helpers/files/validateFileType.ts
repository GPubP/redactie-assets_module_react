import { AssetFile } from '../../services/assets';

import { getFileExtension } from './getFileExtension';

export const validateFileType = (allowedFileTypes: string[], file: File | AssetFile): boolean => {
	const ext = getFileExtension(file);

	// Filter defined?
	if (!Array.isArray(allowedFileTypes) || allowedFileTypes.length === 0) {
		return true;
	}

	// Make allowedFileTypes case insensitive
	const toUpper = (x: string): string => x.toUpperCase();
	const allowedFileTypesToUpper = allowedFileTypes.map(toUpper);

	return allowedFileTypesToUpper.includes(ext.toUpperCase());
};
