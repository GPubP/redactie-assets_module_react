import { Checkbox, Textarea, TextField } from '@acpaas-ui/react-components';
import { ErrorMessage } from '@redactie/utils';
import { Field, FieldProps, Formik } from 'formik';
import React, { FC } from 'react';

import { ModalViewContainer } from '../../ModalView';

import { IMAGE_META_INITIAL_FORM_STATE, IMAGE_META_VALIDATION_SCHEMA } from './ImageMetaForm.const';
import { ImageMetaFormProps } from './ImageMetaForm.types';

const ImageMetaForm: FC<ImageMetaFormProps> = ({
	initialValues = IMAGE_META_INITIAL_FORM_STATE,
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
					<ModalViewContainer>
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
							<div className="col-xs-12 u-margin-bottom">
								<Field
									name="figuratively"
									label="Gebruik als decoratieve afbeelding"
								>
									{({ field, form }: FieldProps) => (
										<div className="a-input">
											<Checkbox
												id={field.name}
												name={field.name}
												label="Gebruik als decoratieve afbeelding"
												checked={field.value}
												onChange={() =>
													form
														.getFieldHelpers('figuratively')
														.setValue(!field.value)
												}
											/>
										</div>
									)}
								</Field>
							</div>
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
					</ModalViewContainer>
					{children && children(props)}
				</>
			)}
		</Formik>
	);
};

export default ImageMetaForm;
