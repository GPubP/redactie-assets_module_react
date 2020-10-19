import { Tab } from '../../../assets.types';
import { ImageCrop, ImageMetaInfo, ImageSelection } from '../../../views';

import { ImageUploadOptions, ModalViewMode } from './ImageUpload.types';

export const VALIDATION_MESSAGES_DEFAULT = {
	INVALID_FILE_TYPE: 'INVALID_FILE_TYPE',
	INVALID_FILE_SIZE: 'INVALID_FILE_SIZE',
	INVALID_MIME_TYPE: 'INVALID_MIME_TYPE',
};

export const UPLOAD_OPTIONS_DEFAULT: ImageUploadOptions = {
	allowedMimeTypes: [],
	allowedFileTypes: [],
	maxFileSize: 0, // 0 is infinite
	url: '',
	messages: VALIDATION_MESSAGES_DEFAULT,
};

export const IMAGE_SETTINGS_DEFAULT_CONFIG = {
	allowedFileTypes: [],
	guideline: '',
	imageConfig: {
		minWidth: 0,
		minHeight: 0,
	},
};

const MODAL_VIEW_ADD_TABS: Tab[] = [
	{
		active: true,
		name: 'Selecteren',
		target: 'select',
		viewComponent: ImageSelection,
	},
	{
		active: false,
		disabled: true,
		name: 'Opladen',
		target: 'upload',
		viewComponent: () => null,
	},
];

const MODAL_VIEW_EDIT_TABS: Tab[] = [
	{
		active: true,
		name: 'Meta-informatie',
		target: 'meta',
		viewComponent: ImageMetaInfo,
	},
	{
		active: false,
		name: 'Bijsnijden en schalen',
		target: 'crop',
		viewComponent: ImageCrop,
	},
	{
		active: false,
		disabled: true,
		name: 'Afbeelding vervangen',
		target: 'change-image',
		viewComponent: () => null,
	},
];

export const MODAL_VIEW_MODE_MAP: { [key in ModalViewMode]: { title: string; tabs: Tab[] } } = {
	[ModalViewMode.ADD]: {
		title: 'Afbeelding toevoegen',
		tabs: MODAL_VIEW_ADD_TABS,
	},
	[ModalViewMode.EDIT]: {
		title: 'Bewerk afbeelding',
		tabs: MODAL_VIEW_EDIT_TABS,
	},
};
