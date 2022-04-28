import { FieldSchema } from '@redactie/form-renderer-module';

import { ExternalAsset, ImageSelectItem, SelectedAsset } from '../../../assets.types';
import { CropOption } from '../ImageFieldSettings';

import { VALIDATION_MESSAGES_DEFAULT } from './Uploader/Uploader.class.const';

export interface ImageUploadOptions {
	allowedMimeTypes?: string[];
	allowedFileTypes: string[];
	maxFileSize?: number;
	minHeight?: number;
	minWidth?: number;
	url?: string;
	messages: typeof VALIDATION_MESSAGES_DEFAULT;
	requestHeader?: { key: string; value: string };
}

type FieldSchemaConfig = FieldSchema['config'] & {};
export interface ImageUploadConfig extends FieldSchemaConfig {
	allowedFileTypes?: string[];
	imageConfig?: {
		cropOptions: CropOption[];
		minWidth: number;
		minHeight: number;
	};
	figuratively?: boolean;
}

export interface ModalViewData {
	config?: ImageUploadConfig;
	imageFieldValue?: ImageFieldValue;
	mode: ModalViewMode;
	queuedFiles?: File[];
	externalFiles?: ExternalAsset[];
	selectedFiles: SelectedAsset[];
	onManualUpload: (files: File[]) => void;
	setImageFieldValue: (value: any) => void;
}

export type ReactiveModalViewData = Pick<
	ModalViewData,
	'queuedFiles' | 'selectedFiles' | 'externalFiles'
>;

export enum ModalViewMode {
	CREATE = 'create',
	SELECT = 'select',
	EDIT = 'edit',
	REPLACE = 'replace',
}

export enum ModalViewTarget {
	CREATE_META = 'create-meta',
	ADD_SELECTION = 'add-selection',
	ADD_UPLOAD = 'add-upload',
	EDIT_META = 'edit-meta',
	EDIT_CROP = 'edit-crop',
}

export interface ImageFieldValue {
	crops?: {
		[key: string]: {
			asset: ImageFieldAsset;
			cropValues: CropValues;
			transformValues: TransformValues;
		};
	};
	meta: {
		copyright: string;
		description: string;
		title: string;
		name: string;
		alt: string;
		figuratively: boolean;
	};
	original: {
		asset: ImageFieldAsset;
	};
}

export interface ImageFieldAsset {
	mime: string;
	uuid: string;
	size: {
		width: number;
		height: number;
	};
	fileName: string;
}

export interface CropValues {
	y: number;
	x: number;
	height: number;
	width: number;
}

export interface TransformValues {
	rotate: number;
	blur: number;
	grayscale: boolean;
}
