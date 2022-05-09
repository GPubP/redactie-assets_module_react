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
import React, { FC, useEffect, useState } from 'react';

import { ExternalAsset, SelectedAsset } from '../../../assets.types';
import { formRendererConnector } from '../../../connectors';
import { getAssetUrl, parseAllowedFileTypes } from '../../../helpers';
import useExternalProviderFacade from '../../../hooks/useExternalProvider/useExternalProvider';
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
	const { guideline, imageConfig = DEFAULT_IMAGE_CONFIG, disabled } = config as ImageUploadConfig;
	const { minWidth, minHeight } = imageConfig;
	const imageFieldValue = (field.value as unknown) as ImageFieldValue;
	const hasCrops = !!imageFieldValue?.crops && !isEmpty(imageFieldValue.crops);
	const FormRendererFieldTitle = formRendererConnector.api.FormRendererFieldTitle;

	/**
	 * Hooks
	 */

	const [modalViewData, setModalViewData] = useState<ReactiveModalViewData>({
		queuedFiles: [],
		externalFiles: [],
		selectedFiles: [],
	});
	const [externalProviders] = useExternalProviderFacade();
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
			minHeight,
			minWidth,
			messages: {
				INVALID_FILE_SIZE: 'Ongeldige bestandsgrootte, max. 10MB',
				INVALID_FILE_TYPE: `Ongeldig bestandstype, volgende types zijn toegestaan: ${config.allowedFileTypes}`,
				INVALID_MIME_TYPE: 'Ongeldig mime type',
				INVALID_IMAGE_HEIGHT: 'Afbeelding voldoet niet aan de minimum hoogte',
				INVALID_IMAGE_WIDTH: 'Afbeelding voldoet niet aan de minimum breedte',
			},
		};

		setOptions(options);
		setUploader(new Uploader(options ?? {}));
	}, [config, config.allowedFileTypes, minHeight, minWidth]);

	/**
	 * Methods
	 */

	const deleteFieldValue = (): void => {
		fieldHelperProps.setValue(null);
	};

	const onModalViewChange = (
		newTarget: string,
		newMode?: string,
		data?: Partial<ReactiveModalViewData>,
		keepFiles = false
	): void => {
		setModalViewData({
			...modalViewData,
			...data,
			...(!keepFiles && {
				queuedFiles: [],
				externalFiles: [],
				selectedFiles: [],
			}),
		});

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

	const handleManualUpload = async (files: File[] = []): Promise<void> => {
		if (uploader && files.length) {
			const uploaded = await uploader.validateFiles(files);

			if (uploaded.invalidFiles.length) {
				setInvalidFiles(uploaded.invalidFiles);
				setShowModal(false);
			} else if (uploaded.validFiles.length) {
				setModalViewData({ ...modalViewData, queuedFiles: uploaded.validFiles });
				setMode(ModalViewMode.CREATE);
			}
		}
	};

	const handleExternalSelect = async (externalFiles: ExternalAsset[] = []): Promise<void> => {
		setModalViewData({ ...modalViewData, externalFiles });
	};

	const handleInternalSelect = (selectedFiles: SelectedAsset[]): void => {
		setModalViewData({ ...modalViewData, selectedFiles });
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
		setModalViewData({ ...modalViewData, queuedFiles: [], selectedFiles: [] });
	};

	const onDelete = (): void => {
		deleteFieldValue();
		closeModal();
	};

	// If no crops are present, remove everything in the field value
	// This will prevent metadata and original assets being sent to the server
	const onCloseModal = (isSaving = false): void => {
		if (!hasCrops && !(isSaving === true)) {
			return onDelete();
		}

		return closeModal();
	};

	/**
	 * Render
	 */

	if (!uploader) {
		return null;
	}

	return (
		<>
			<div
				className={cx('a-input', {
					'o-image-upload': hasCrops,
					'is-required': config.required,
				})}
			>
				<Card className={cx({ 'o-image-upload__card': hasCrops })}>
					<CardBody>
						{fieldSchema.label && (
							<FormRendererFieldTitle
								isRequired={!!fieldSchema.config?.required}
								className="u-margin-bottom"
							>
								{fieldSchema?.label}
							</FormRendererFieldTitle>
						)}
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
									disabled={disabled}
								>
									<FileUploadMessage>
										<span
											className={cx({
												'o-image-upload__text--disabled': disabled,
												'u-text-primary': true,
											})}
										>
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
							<>
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
								<ValidationList
									messages={options?.messages}
									ariaLabelRemove="Verwijder"
									invalidFiles={invalidFiles}
									removeInvalidFile={handleRemoveInvalidFile}
								/>
							</>
						)}

						<ControlledModal
							className={cx('o-image-upload__modal')}
							onClose={onCloseModal}
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
									config={MODAL_VIEW_MODE_MAP(externalProviders)}
									mode={mode}
									onCancel={onCloseModal}
									onDelete={onDelete}
									onViewChange={onModalViewChange}
									onInternalSelect={handleInternalSelect}
									onExternalSelect={handleExternalSelect}
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
							onClick={deleteFieldValue}
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
