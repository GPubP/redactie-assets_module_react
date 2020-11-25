import { Button, Card, CardBody, Icon } from '@acpaas-ui/react-components';
import {
	ControlledModal,
	FileUploadDescription,
	FileUploadMessage,
	FileUploadZone,
	ValidationList,
} from '@acpaas-ui/react-editorial-components';
import { isEmpty } from '@datorama/akita';
import { InputFieldProps } from '@redactie/form-renderer-module';
import classnames from 'classnames/bind';
import { omit } from 'ramda';
import React, { FC, useEffect, useState } from 'react';

import { formRendererConnector } from '../../../connectors';
import { getAssetUrl, parseAllowedFileTypes } from '../../../helpers';
import { ImageItem } from '../../ImageItem';
import { ModalView } from '../../ModalView';

import {
	DEFAULT_IMAGE_CONFIG,
	IMAGE_SETTINGS_DEFAULT_CONFIG,
	MODAL_VIEW_MODE_MAP,
} from './ImageUpload.const';
import styles from './ImageUpload.module.scss';
import {
	ImageFieldValue,
	ImageUploadConfig,
	ImageUploadOptions,
	ModalViewMode,
	ModalViewTarget,
	ReactiveModalViewData,
} from './ImageUpload.types';
import { InvalidFile, Uploader } from './Uploader';

const cx = classnames.bind(styles);

const ImageUpload: FC<InputFieldProps> = ({ fieldProps, fieldSchema, fieldHelperProps }) => {
	const { field } = fieldProps;
	const { config = IMAGE_SETTINGS_DEFAULT_CONFIG } = fieldSchema;
	const { guideline, imageConfig = DEFAULT_IMAGE_CONFIG } = config as ImageUploadConfig;
	const { minWidth, minHeight } = imageConfig;
	const imageFieldValue = (field.value as unknown) as ImageFieldValue;
	const hasCrops = !!imageFieldValue?.crops && !isEmpty(imageFieldValue.crops);

	/**
	 * Hooks
	 */

	const [modalViewData, setModalViewData] = useState<ReactiveModalViewData>({
		queuedFiles: [],
		selectedFiles: [],
	});
	const [mode, setMode] = useState(ModalViewMode.EDIT);
	const [options, setOptions] = useState<ImageUploadOptions | null>(null);
	const [showModal, setShowModal] = useState(false);
	const [invalidFiles, setInvalidFiles] = useState<InvalidFile[]>([]);
	const [target, setTarget] = useState<ModalViewTarget | null>(null);
	const [uploader, setUploader] = useState<Uploader | null>(null);

	// Instantiate Uploader class with options from fieldSchema
	useEffect(() => {
		const allowedFileTypes = parseAllowedFileTypes(config.allowedFileTypes);
		const options: ImageUploadOptions = {
			allowedFileTypes,
			messages: {
				INVALID_FILE_SIZE: 'Ongeldige bestandsgrootte',
				INVALID_FILE_TYPE: `Ongeldig bestandstype, volgende types zijn toegestaan: ${config.allowedFileTypes}`,
				INVALID_MIME_TYPE: 'Ongeldig mime type',
			},
		};

		setOptions(options);
		setUploader(new Uploader(options ?? {}));
	}, [config, config.allowedFileTypes]);

	/**
	 * Methods
	 */

	const deleteCrops = (): void => {
		fieldHelperProps.setValue(omit(['crops'], imageFieldValue));
	};

	const onModalViewChange = (
		newTarget: string,
		newMode?: string,
		data?: Partial<ReactiveModalViewData>
	): void => {
		setModalViewData({ ...modalViewData, ...data, queuedFiles: [] });
		setTarget(newTarget as ModalViewTarget);

		if (newMode) {
			setMode(newMode as ModalViewMode);
		}
	};

	const handleCustomUpload = (): void => {
		setMode(ModalViewMode.SELECT);
		setShowModal(true);
		setModalViewData({ ...modalViewData, queuedFiles: [] });
	};

	const handleCustomDrop = (files: File[]): void => {
		if (!files || files.length === 0) {
			// There must be a validation error
			return;
		}
		setModalViewData({ ...modalViewData, queuedFiles: files });
		setMode(ModalViewMode.CREATE);
		setShowModal(true);
	};

	const handleManualUpload = (files: File[] = []): void => {
		if (uploader && files.length) {
			const uploaded = uploader.validateFiles(files);

			if (uploaded.invalidFiles.length) {
				setInvalidFiles(uploaded.invalidFiles);
				setShowModal(false);
			} else if (uploaded.validFiles.length) {
				setModalViewData({ ...modalViewData, queuedFiles: uploaded.validFiles });
				setMode(ModalViewMode.CREATE);
			}
		}
	};

	const handleInvalidFiles = (invFiles: InvalidFile[]): void => {
		setInvalidFiles(invFiles);
	};

	const handleRemoveInvalidFile = (index: number): void => {
		setInvalidFiles(invalidFiles.filter((file, i) => i !== index));
	};

	const closeModal = (): void => {
		setTarget(null);
		setShowModal(false);
		setModalViewData({ ...modalViewData, queuedFiles: [] });
	};

	/**
	 * Render
	 */

	if (!uploader) {
		return null;
	}

	return (
		<>
			<div className={cx({ 'o-image-upload': hasCrops })}>
				<Card className={cx({ 'o-image-upload__card': hasCrops })}>
					<CardBody>
						<h6 className="u-margin-bottom">{fieldSchema?.label}</h6>
						{guideline && <p className="u-margin-bottom">{guideline}</p>}
						{!hasCrops ? (
							<>
								<FileUploadZone
									autoUpload={false}
									id={fieldSchema.name}
									uploader={uploader}
									invalidFiles={handleInvalidFiles}
									onCustomClick={handleCustomUpload}
									onCustomDrop={handleCustomDrop}
								>
									<FileUploadMessage>
										<span className="u-text-primary">
											<Icon name="picture-o" />
											<span className="u-block">
												Selecteer of sleep een afbeelding
											</span>
										</span>
									</FileUploadMessage>
									<FileUploadDescription>
										Laad een afbeelding op van minimum {minWidth}px breed en{' '}
										{minHeight}
										px hoog
									</FileUploadDescription>
								</FileUploadZone>
								<ValidationList
									messages={options?.messages}
									ariaLabelRemove="Verwijder"
									invalidFiles={invalidFiles}
									removeInvalidFile={handleRemoveInvalidFile}
								/>
							</>
						) : (
							<ImageItem
								source={getAssetUrl(imageFieldValue.original.asset.uuid)}
								meta={imageFieldValue.meta}
								onImageClick={() => {
									onModalViewChange(
										ModalViewTarget.EDIT_CROP,
										ModalViewMode.EDIT
									);
									setShowModal(true);
								}}
							/>
						)}

						<ControlledModal
							className={cx('o-image-upload__modal')}
							onClose={closeModal}
							overlayClassName={cx('o-image-upload__overlay')}
							show={showModal}
						>
							{showModal ? (
								<ModalView
									data={{
										...modalViewData,
										mode,
										config,
										imageFieldValue,
										onManualUpload: handleManualUpload,
										setImageFieldValue: fieldHelperProps.setValue,
									}}
									config={MODAL_VIEW_MODE_MAP}
									mode={mode}
									onCancel={closeModal}
									onViewChange={onModalViewChange}
									target={target || ''}
								/>
							) : null}
						</ControlledModal>
					</CardBody>
				</Card>
				{hasCrops ? (
					<div className={cx('o-image-upload__actions')}>
						<Button
							htmlType="button"
							icon="edit"
							onClick={() => {
								onModalViewChange(ModalViewTarget.EDIT_META, ModalViewMode.EDIT);
								setShowModal(true);
							}}
							transparent
						/>
						<Button
							htmlType="button"
							icon="trash"
							onClick={deleteCrops}
							transparent
							type="danger"
						/>
					</div>
				) : null}
			</div>
			<formRendererConnector.api.ErrorMessage name={field.name} />
		</>
	);
};

export default ImageUpload;
