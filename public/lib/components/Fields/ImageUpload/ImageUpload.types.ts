import { VALIDATION_MESSAGES_DEFAULT } from './ImageUpload.const';

export interface ImageUploadOptions {
	allowedMimeTypes: string[];
	allowedFileTypes: string[];
	maxFileSize: number;
	url: string;
	messages: typeof VALIDATION_MESSAGES_DEFAULT;
	requestHeader?: { key: string; value: string };
}

export enum ModalViewMode {
	ADD = 'add',
	EDIT = 'edit',
}

export enum ModalViewTarget {
	ADD_SELECTION = 'add-selection',
	ADD_UPLOAD = 'add-upload',
	EDIT_META = 'edit-meta',
	EDIT_CROP = 'edit-crop',
	EDIT_REPLACE = 'edit-replace',
}
