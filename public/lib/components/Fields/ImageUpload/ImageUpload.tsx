import { Card, CardBody, Icon } from '@acpaas-ui/react-components';
import {
	ControlledModal,
	FileUploadDescription,
	FileUploadMessage,
	FileUploadZone,
} from '@acpaas-ui/react-editorial-components';
import { InputFieldProps } from '@redactie/form-renderer-module';
import React, { FC, useEffect, useState } from 'react';

import { IMAGE_SETTINGS_DEFAULT_CONFIG } from './ImageUpload.const';
import { Uploader } from './Uploader';

const ImageUpload: FC<InputFieldProps> = ({ fieldProps, fieldSchema }) => {
	const { field } = fieldProps;
	const { config = IMAGE_SETTINGS_DEFAULT_CONFIG } = fieldSchema;
	const { guideline, imageConfig } = config;
	const { minWidth, minHeight } = imageConfig;

	/**
	 * Hooks
	 */
	const [showModal, setShowModal] = useState(false);
	const [uploader, setUploader] = useState<Uploader | null>(null);

	useEffect(() => {
		let options = {};

		if (fieldSchema.config) {
			const { allowedFileTypes = [] } = fieldSchema.config;
			options = { allowedFileTypes: allowedFileTypes.split(',') };
		}

		setUploader(new Uploader(options));
	}, [config, fieldSchema.config]);

	/**
	 * Methods
	 */

	const handleCustomUpload = (): void => {
		setShowModal(true);
	};

	const handleCustomDrop = (): void => {
		setShowModal(true);
	};

	/**
	 * Render
	 */

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
						<div className="u-text-primary">
							<Icon name="picture-o" />
							<p>Selecteer of sleep een afbeelding</p>
						</div>
					</FileUploadMessage>
					<FileUploadDescription>
						Laad een afbeelding op van minimum {minWidth}px breed en {minHeight}px hoog
					</FileUploadDescription>
				</FileUploadZone>

				<ControlledModal onClose={() => setShowModal(false)} show={showModal}>
					<div>TODO: add modal flow</div>
				</ControlledModal>
			</CardBody>
		</Card>
	);
};

export default ImageUpload;
