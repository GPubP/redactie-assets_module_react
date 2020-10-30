import { AssetFile } from '../../services/assets';

export const getFileExtension = (file: File | AssetFile): string =>
	file.name.split('.')[file.name.split('.').length - 1];
