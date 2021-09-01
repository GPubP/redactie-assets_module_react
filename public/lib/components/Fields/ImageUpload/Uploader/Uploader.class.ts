import { validateFileType } from '../../../../helpers';
import { ImageUploadOptions } from '../ImageUpload.types';

import { UPLOAD_OPTIONS_DEFAULT } from './Uploader.class.const';
import { ValidatedFiles } from './Uploader.class.types';

export class Uploader {
	options: ImageUploadOptions = UPLOAD_OPTIONS_DEFAULT;

	constructor(options = {}) {
		this.setOptions(options);
	}

	setOptions(options = {}): void {
		this.options = {
			...this.options,
			...options,
		};
	}

	uploadFiles(): void {
		// Placeholder function
	}

	async validateFiles(files: File[] = []): Promise<ValidatedFiles> {
		return files.reduce(
			async (acc, file) => {
				const resolvedAcc = await acc;
				const errors = [];

				if (!this.validateFileType(file)) {
					errors.push('INVALID_FILE_TYPE');
				}

				if (!this.validateFileSize(file)) {
					errors.push('INVALID_FILE_SIZE');
				}

				const [hasValidHeight, hasValidWidth] = await this.validateImageDimensions(file);
				if (!hasValidWidth) {
					errors.push('INVALID_IMAGE_WIDTH');
				}

				if (!hasValidHeight) {
					errors.push('INVALID_IMAGE_HEIGHT');
				}

				if (!this.validateMimeType(file)) {
					errors.push('INVALID_MIME_TYPE');
				}

				if (errors.length === 0) {
					resolvedAcc.validFiles.push(file);
				} else {
					resolvedAcc.invalidFiles.push({
						reasons: errors,
						file,
					});
				}

				return acc;
			},
			Promise.resolve({
				validFiles: [],
				invalidFiles: [],
			} as ValidatedFiles)
		);
	}

	filesToFormData(files: File[] = []): FormData {
		const formData = new FormData();

		if (!this.options.url || this.options.url === '') {
			throw new Error('Define the upload url.');
		}

		files.forEach(file => {
			formData.append('file', file);

			// TODO: This should not be included in this file
			formData.append('name', 'test');
			formData.append('description', 'description');
			formData.append('copyright', 'copyright');
			formData.append('category', 'file');
			formData.append('editor', 'some editor');
		});

		return formData;
	}

	validateFileType(file: File): boolean {
		const { allowedFileTypes } = this.options;

		return validateFileType(allowedFileTypes, file);
	}

	validateImageDimensions(file: File): Promise<[boolean, boolean]> {
		return new Promise(resolve => {
			const { minHeight, minWidth } = this.options;

			const img = new Image();
			img.src = URL.createObjectURL(file);
			img.onload = function() {
				resolve([
					minHeight ? img.height >= minHeight : true,
					minWidth ? img.width >= minWidth : true,
				]);
			};
		});
	}

	validateFileSize(file: File): boolean {
		const { maxFileSize } = this.options;

		// Filter defined?
		if (!maxFileSize || maxFileSize === 0) {
			return true;
		}

		return maxFileSize > file.size;
	}

	validateMimeType(file: File): boolean {
		const { allowedMimeTypes } = this.options;

		// Filter defined?
		if (!Array.isArray(allowedMimeTypes) || allowedMimeTypes.length === 0) {
			return true;
		}

		return allowedMimeTypes.lastIndexOf(file.type) !== -1;
	}
}
