import { ImageUploadOptions } from '../ImageUpload.types';

export const VALIDATION_MESSAGES_DEFAULT = {
	INVALID_FILE_TYPE: 'INVALID_FILE_TYPE',
	INVALID_FILE_SIZE: 'INVALID_FILE_SIZE',
	INVALID_MIME_TYPE: 'INVALID_MIME_TYPE',
};

export const UPLOAD_OPTIONS_DEFAULT: ImageUploadOptions = {
	allowedMimeTypes: [],
	allowedFileTypes: [],
	maxFileSize: 10485760, // 10MB, 0 is infinite
	url: '',
	messages: VALIDATION_MESSAGES_DEFAULT,
};
