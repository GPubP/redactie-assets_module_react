import { VALIDATION_MESSAGES_DEFAULT } from './ImageUpload.const';

export interface ImageUploadOptions {
	allowedMimeTypes: string[];
	allowedFileTypes: string[];
	maxFileSize: number;
	url: string;
	messages: typeof VALIDATION_MESSAGES_DEFAULT;
	requestHeader?: { key: string; value: string };
}
