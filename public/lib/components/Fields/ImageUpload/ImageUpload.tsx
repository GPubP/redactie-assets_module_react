import { Card, CardBody, Icon } from '@acpaas-ui/react-components';
import {
	ControlledModal,
	FileUploadDescription,
	FileUploadMessage,
	FileUploadZone,
} from '@acpaas-ui/react-editorial-components';
import { InputFieldProps } from '@redactie/form-renderer-module';
import React, { FC, useState } from 'react';

const ImageUpload: FC<InputFieldProps> = ({ fieldProps, fieldSchema }) => {
	console.log({ fieldProps, fieldSchema });

	/**
	 * Hooks
	 */
	const [showModal, setShowModal] = useState(false);

	/**
	 * Methods
	 */

	const handleCustomUpload = (): void => {
		console.log('Custom upload');
		setShowModal(true);
	};

	/**
	 * Render
	 */

	return (
		<Card>
			<CardBody>
				<h5></h5>
				<FileUploadZone onCustomClick={handleCustomUpload}>
					<FileUploadMessage>
						<Icon name="picture-o" />
						<p className="u-text-primary">Selecteer of sleep een afbeelding</p>
					</FileUploadMessage>
					<FileUploadDescription>Optional description message</FileUploadDescription>
				</FileUploadZone>
				<ControlledModal onClose={() => setShowModal(false)} show={showModal}>
					<div>TODO: add modal flow</div>
				</ControlledModal>
			</CardBody>
		</Card>
	);
};

export default ImageUpload;
