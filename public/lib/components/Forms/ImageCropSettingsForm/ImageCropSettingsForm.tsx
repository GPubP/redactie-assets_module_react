import { Select, Textarea, TextField } from '@acpaas-ui/react-components';
import { ErrorMessage } from '@redactie/utils';
import { Field, Formik, FormikProps } from 'formik';
import React, { FC, ReactElement } from 'react';

import { CropOption } from '../../Fields/ImageFieldSettings';

import { CROP_METHODS, IMAGE_CROP_SETTINGS_VALIDATION_SCHEMA } from './ImageCropSettingsForm.const';
import {
	CropMethodFieldOption,
	CropMethods,
	ImageCropSettingsFormProps,
} from './ImageCropSettingsForm.types';

const ImageCropSettingsForm: FC<ImageCropSettingsFormProps> = ({
	initialValues,
	onSubmit = () => null,
	children,
}) => {
	/**
	 * Function
	 */

	const getCropMethod = (value: string): CropMethodFieldOption | undefined =>
		CROP_METHODS.find(method => method.value === value);

	/**
	 * Render
	 */
	const renderMethodOptionsFields = (method: string): ReactElement | null => {
		if (method === CropMethods.EXACT) {
			return (
				<div className="row u-margin-bottom">
					<div className="col-xs-12 col-md-8 row">
						<div className="col-xs-5 row middle-xs flex-no-wrap">
							<div className="col-xs-10">
								<Field
									as={TextField}
									type="number"
									min={0}
									id="exactDimensions.width"
									name="exactDimensions.width"
									label="Breedte"
								/>
							</div>
							<div className="col-xs-2 u-margin-top">
								<small className="suffix-neg-margin-left">px</small>
							</div>
						</div>
						<div className="col-xs-2 flex-align-self-center u-margin-top">op</div>
						<div className="col-xs-5 row middle-xs flex-no-wrap">
							<div className="col-xs-10">
								<Field
									as={TextField}
									type="number"
									min={0}
									id="exactDimensions.height"
									name="exactDimensions.height"
									label="Hoogte"
								/>
							</div>
							<div className="col-xs-2 u-margin-top">
								<small className="suffix-neg-margin-left">px</small>
							</div>
						</div>
					</div>
				</div>
			);
		}

		if (method === CropMethods.BOUNDS) {
			return (
				<>
					<div className="row u-margin-bottom">
						<div className="col-xs-12 row u-margin-bottom">
							<div className="col-xs-12 col-md-8 row">
								<div className="col-xs-5 row middle-xs flex-no-wrap">
									<div className="col-xs-10">
										<Field
											as={TextField}
											type="number"
											min={0}
											id="boundsDimensions.minWidth"
											name="boundsDimensions.minWidth"
											label="Minimumbreedte"
										/>
									</div>
									<div className="col-xs-2 u-margin-top">
										<small className="suffix-neg-margin-left">px</small>
									</div>
								</div>
								<div className="col-xs-2 flex-align-self-center u-margin-top">
									op
								</div>
								<div className="col-xs-5 row middle-xs flex-no-wrap">
									<div className="col-xs-10">
										<Field
											as={TextField}
											type="number"
											min={0}
											id="boundsDimensions.minHeight"
											name="boundsDimensions.minHeight"
											label="Minimumhoogte"
										/>
									</div>
									<div className="col-xs-2 u-margin-top">
										<small className="suffix-neg-margin-left">px</small>
									</div>
								</div>
							</div>
						</div>
						<div className="col-xs-12 row u-margin-bottom">
							<div className="col-xs-12 col-md-8 row">
								<div className="col-xs-5 row middle-xs flex-no-wrap">
									<div className="col-xs-10">
										<Field
											as={TextField}
											type="number"
											min={0}
											id="boundsDimensions.maxWidth"
											name="boundsDimensions.maxWidth"
											label="Maximumbreedte"
										/>
									</div>
									<div className="col-xs-2 u-margin-top">
										<small className="suffix-neg-margin-left">px</small>
									</div>
								</div>
								<div className="col-xs-2 flex-align-self-center u-margin-top">
									op
								</div>
								<div className="col-xs-5 row middle-xs flex-no-wrap">
									<div className="col-xs-10">
										<Field
											as={TextField}
											type="number"
											min={0}
											id="boundsDimensions.maxHeight"
											name="boundsDimensions.maxHeight"
											label="Maximumhoogte"
										/>
									</div>
									<div className="col-xs-2 u-margin-top">
										<small className="suffix-neg-margin-left">px</small>
									</div>
								</div>
							</div>
							<div className="a-input">
								<small className="u-margin-left-xs">
									Bepaal de breedte en/of hoogte voor de afbeelding
								</small>
							</div>
						</div>
					</div>
				</>
			);
		}

		if (method === CropMethods.RATIO) {
			return (
				<div className="row u-margin-bottom">
					<div className="col-xs-12 col-md-8 row">
						<div className="col-xs-5 row middle-xs flex-no-wrap">
							<div className="col-xs-10">
								<Field
									as={TextField}
									type="number"
									min={0}
									id="ratioDimensions.x"
									name="ratioDimensions.x"
									label="Verhouding X"
								/>
							</div>
							<div className="col-xs-2 u-margin-top">
								<small className="suffix-neg-margin-left">px</small>
							</div>
						</div>
						<div className="col-xs-2 flex-align-self-center u-margin-top">op</div>
						<div className="col-xs-5 row middle-xs flex-no-wrap">
							<div className="col-xs-10">
								<Field
									as={TextField}
									type="number"
									min={0}
									id="ratioDimensions.y"
									name="ratioDimensions.y"
									label="Verhouding Y"
								/>
							</div>
							<div className="col-xs-2 u-margin-top">
								<small className="suffix-neg-margin-left">px</small>
							</div>
						</div>
					</div>
				</div>
			);
		}

		return null;
	};

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={IMAGE_CROP_SETTINGS_VALIDATION_SCHEMA}
		>
			{props => {
				return (
					<>
						<div className="row u-margin-bottom">
							<div className="col-xs-12">
								<Field as={TextField} id="name" required name="name" label="Naam" />
								<ErrorMessage
									className="u-text-danger u-margin-top-xs"
									component="p"
									name="name"
								/>
							</div>
						</div>
						<div className="row u-margin-bottom">
							<div className="col-xs-12 a-input">
								<Field
									as={Textarea}
									required
									id="guideline"
									name="guideline"
									label="Richtlijn"
									description="Geef een richtlijn op voor de redacteur."
								/>
								<small>Geef een richtlijn op voor de redacteur.</small>
								<ErrorMessage
									className="u-text-danger u-margin-top-xs"
									component="p"
									name="guideline"
								/>
							</div>
						</div>
						<div className="row u-margin-bottom">
							<div className="col-xs-6 a-input">
								<Field
									as={Select}
									required
									id="method"
									name="method"
									label="Methode"
									options={CROP_METHODS}
									placeholder="Methode"
								/>
								<small>{getCropMethod(props.values.method)?.guideline}</small>
								<ErrorMessage
									className="u-text-danger u-margin-top-xs"
									component="p"
									name="method"
								/>
							</div>
						</div>
						{renderMethodOptionsFields(props.values.method)}
						{(children as (bag: FormikProps<CropOption>) => React.ReactNode)(props)}
					</>
				);
			}}
		</Formik>
	);
};

export default ImageCropSettingsForm;
