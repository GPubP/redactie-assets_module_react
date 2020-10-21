import { Card, CardBody, Icon } from '@acpaas-ui/react-components';
import {
	ControlledModal,
	FileUploadDescription,
	FileUploadMessage,
	FileUploadZone,
} from '@acpaas-ui/react-editorial-components';
import { InputFieldProps } from '@redactie/form-renderer-module';
import classnames from 'classnames/bind';
import React, { FC, useEffect, useState } from 'react';

import ModalView from '../../ModalView/ModalView';

import { IMAGE_SETTINGS_DEFAULT_CONFIG, MODAL_VIEW_MODE_MAP } from './ImageUpload.const';
import styles from './ImageUpload.module.scss';
import { ModalViewMode, ModalViewTarget } from './ImageUpload.types';
import { Uploader } from './Uploader';

const cx = classnames.bind(styles);

const ImageUpload: FC<InputFieldProps> = ({ fieldProps, fieldSchema }) => {
	const { field } = fieldProps;
	const { config = IMAGE_SETTINGS_DEFAULT_CONFIG } = fieldSchema;
	const { guideline, imageConfig } = config;
	const { minWidth, minHeight } = imageConfig;

	/**
	 * Hooks
	 */

	const [mode, setMode] = useState(ModalViewMode.EDIT);
	const [showModal, setShowModal] = useState(false);
	const [target, setTarget] = useState<ModalViewTarget | null>(null);
	const [uploader, setUploader] = useState<Uploader | null>(null);

	// Instantiate Uploader class with options from fieldSchema
	useEffect(() => {
		let options = {};

		if (fieldSchema.config) {
			const { allowedFileTypes = [] } = fieldSchema.config;
			options = { allowedFileTypes: allowedFileTypes.split(',') };
		}

		setUploader(new Uploader(options));
	}, [fieldSchema.config]);

	/**
	 * Methods
	 */

	const onModalViewChange = (newTarget: string, newMode?: string): void => {
		setTarget(newTarget as ModalViewTarget);

		if (newMode) {
			setMode(newMode as ModalViewMode);
		}
	};

	const handleCustomUpload = (): void => {
		setMode(ModalViewMode.ADD);
		setShowModal(true);
	};

	const handleCustomDrop = (): void => {
		setMode(ModalViewMode.ADD);
		setShowModal(true);
	};

	const closeModal = (): void => {
		setTarget(null);
		setShowModal(false);
	};

	/**
	 * Render
	 */

	if (!uploader) {
		return null;
	}

	return (
		<Card>
			<CardBody>
				<h6>{field?.name}</h6>
				{guideline && <p className="u-margin-top u-margin-bottom">{guideline}</p>}
				<FileUploadZone
					uploader={uploader}
					onCustomClick={handleCustomUpload}
					onCustomDrop={handleCustomDrop}
				>
					<FileUploadMessage>
						<span className="u-text-primary">
							<Icon name="picture-o" />
							<span className="u-block">Selecteer of sleep een afbeelding</span>
						</span>
					</FileUploadMessage>
					<FileUploadDescription>
						Laad een afbeelding op van minimum {minWidth}px breed en {minHeight}px hoog
					</FileUploadDescription>
				</FileUploadZone>

				<ControlledModal
					className={cx('o-image-upload__modal')}
					onClose={closeModal}
					show={showModal}
				>
					{showModal ? (
						<ModalView
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
	);
};

export default ImageUpload;
