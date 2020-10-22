import { FieldSchema } from '@redactie/form-renderer-module';

import { AssetResponse } from '../../../services/assets';

import { VALIDATION_MESSAGES_DEFAULT } from './Uploader/Uploader.class.const';

export interface ImageUploadOptions {
	allowedMimeTypes?: string[];
	allowedFileTypes: string[];
	maxFileSize?: number;
	url?: string;
	messages: typeof VALIDATION_MESSAGES_DEFAULT;
	requestHeader?: { key: string; value: string };
}

type FieldSchemaConfig = FieldSchema['config'] & {};
export interface ImageUploadConfig extends FieldSchemaConfig {
	allowedFileTypes?: string[];
	imageConfig?: {
		minWidth: number;
		minHeight: number;
	};
}

export interface ModalViewData {
	config?: ImageUploadConfig;
	queuedFiles?: File[];
	selectedFiles: Pick<AssetResponse, 'uuid' | 'data'>[];
	imageFieldValue?: ImageFieldValue;
	setImageFieldValue: (value: any) => void;
}

export enum ModalViewMode {
	CREATE = 'create',
	SELECT = 'select',
	EDIT = 'edit',
}

export enum ModalViewTarget {
	CREATE_META = 'create-meta',
	ADD_SELECTION = 'add-selection',
	ADD_UPLOAD = 'add-upload',
	EDIT_META = 'edit-meta',
	EDIT_CROP = 'edit-crop',
	EDIT_REPLACE = 'edit-replace',
}

export interface ImageFieldValue {
	crops?: {
		[key: string]: {
			asset: {
				mime: string;
				uuid: string;
				size: {
					width: number;
					height: number;
				};
				fileName: string;
			};
			cropValues: {
				y: number;
				x: number;
				height: number;
				width: number;
			};
			transformValues: {
				rotate: number;
				blur: number;
				grayscale: boolean;
			};
		};
	};
	meta: {
		copyright: string;
		description: string;
		title: string;
		name: string;
		alt: string;
	};
	original: {
		asset: {
			mime: string;
			uuid: string;
			size: {
				height: number;
				width: number;
			};
			fileName: string;
		};
	};
}
