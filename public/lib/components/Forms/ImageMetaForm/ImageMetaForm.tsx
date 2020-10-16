import { Textarea, TextField } from '@acpaas-ui/react-components';
import { ErrorMessage } from '@redactie/utils';
import { Field, Formik, FormikProps } from 'formik';
import React, { FC } from 'react';

import { ImageMetaFormProps, ImageMetaFormState } from './ImageMetaForm.types';
import { IMAGE_META_VALIDATION_SCHEMA } from './ImageMeteForm.const';

const ImageMetaForm: FC<ImageMetaFormProps> = ({
	initialValues = {
		name: '',
		title: '',
		alt: '',
		description: '',
		copyright: '',
	},
	onSubmit = () => null,
	children,
}) => {
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={IMAGE_META_VALIDATION_SCHEMA}
		>
			{props => (
				<>
					<div className="u-margin-bottom">
						<Field
							as={TextField}
							id="name"
							required
							name="name"
							label="Naam"
							description="Geef een herkenbare naam aan de afbeelding."
						/>
						<ErrorMessage
							className="u-text-danger u-margin-top-xs"
							component="p"
							name="name"
						/>
					</div>
					<div className="row">
						<div className="col-xs-12 col-md-6 u-margin-bottom">
							<Field
								as={TextField}
								id="alt"
								required
								name="alt"
								label="Alt"
								description="Bepaal de tekst die verschijnt als de afbeelding niet laadt."
							/>
							<ErrorMessage
								className="u-text-danger u-margin-top-xs"
								component="p"
								name="alt"
							/>
						</div>
						<div className="col-xs-12 col-md-6 u-margin-bottom">
							<Field
								as={TextField}
								id="title"
								required
								name="title"
								label="Titel"
								description="Bepaal de titel van de afbeelding."
							/>
							<ErrorMessage
								className="u-text-danger u-margin-top-xs"
								component="p"
								name="title"
							/>
						</div>
					</div>
					<div className="u-margin-bottom a-input">
						<Field
							as={Textarea}
							id="description"
							name="description"
							label="Beschrijving"
						/>
						<small>Geef de afbeelding een beschrijving (caption).</small>
					</div>
					<div className="u-margin-bottom">
						<Field
							as={TextField}
							id="copyright"
							name="copyright"
							label="Copyright"
							description="Geef de bron op van de afbeelding."
						/>
					</div>
					{children &&
						(children as (bag: FormikProps<ImageMetaFormState>) => React.ReactNode)(
							props
						)}
				</>
			)}
		</Formik>
	);
};

export default ImageMetaForm;
