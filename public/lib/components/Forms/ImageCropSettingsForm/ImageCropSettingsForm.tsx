import { Select, Textarea, TextField } from '@acpaas-ui/react-components';
import { Field, Formik, FormikProps } from 'formik';
import React, { FC, ReactElement } from 'react';

import {
	CROP_METHODS,
	CropMethodFieldOption,
	CropMethods,
	CropOption,
} from '../../Fields/ImageFieldSettings';

import { ImageCropSettingsFormProps } from './ImageCropSettingsForm.types';

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
				<div className="row">
					<div className="col-xs-6">
						<Field
							as={TextField}
							type="number"
							min={0}
							id="exactDimensions.width"
							name="exactDimensions.width"
							label="Breedte"
						/>
					</div>
					<div className="col-xs-6">
						<Field
							as={TextField}
							type="number"
							min={0}
							id="exactDimensions.height"
							name="exactDimensions.height"
							label="Hoogte"
						/>
					</div>
				</div>
			);
		}

		if (method === CropMethods.BOUNDS) {
			return (
				<div className="row">
					<div className="col-xs-8 row">
						<div className="col-xs-12 row">
							<div className="col-xs-6">
								<Field
									as={TextField}
									type="number"
									min={0}
									id="boundsDimensions.minWidth"
									name="boundsDimensions.minWidth"
									label="Minimumbreedte"
								/>
							</div>
							<div className="col-xs-6">
								<Field
									as={TextField}
									type="number"
									min={0}
									id="boundsDimensions.minHeight"
									name="boundsDimensions.minHeight"
									label="Minimumhoogte"
								/>
							</div>
						</div>
						<div className="col-xs-12 row">
							<div className="col-xs-6">
								<Field
									as={TextField}
									type="number"
									min={0}
									id="boundsDimensions.maxWidth"
									name="boundsDimensions.maxWidth"
									label="Maximumbreedte"
								/>
							</div>
							<div className="col-xs-6">
								<Field
									as={TextField}
									type="number"
									min={0}
									id="boundsDimensions.maxHeight"
									name="boundsDimensions.maxHeight"
									label="Maximumhoogte"
								/>
							</div>
						</div>
					</div>
					<div className="col-xs-4"></div>
					<small>Bepaal de breedte en/of hoogte voor de afbeelding</small>
				</div>
			);
		}

		if (method === CropMethods.RATIO) {
			return (
				<div className="row">
					<div className="col-xs-6">
						<Field
							as={TextField}
							type="number"
							min={0}
							id="ratioDimensions.x"
							name="ratioDimensions.x"
							label="Verhouding X"
						/>
					</div>
					<div className="col-xs-6">
						<Field
							as={TextField}
							type="number"
							min={0}
							id="ratioDimensions.y"
							name="ratioDimensions.y"
							label="Verhouding Y"
						/>
					</div>
				</div>
			);
		}

		return null;
	};

	return (
		<Formik initialValues={initialValues} onSubmit={onSubmit}>
			{props => {
				return (
					<>
						<div className="row">
							<div className="col-xs-12">
								<Field as={TextField} id="name" name="name" label="Naam" />
							</div>
						</div>
						<div className="row">
							<div className="col-xs-12">
								<Field
									as={Textarea}
									id="guideline"
									name="guideline"
									label="Richtlijn"
									description="Geef een richtlijn op voor de redacteur."
								/>
							</div>
						</div>
						<div className="row">
							<div className="col-xs-12">
								<Field
									as={TextField}
									id="guideline"
									name="guideline"
									label="Richtlijn"
									description="Geef een richtlijn op voor de redacteur."
								/>
							</div>
						</div>
						<div className="row">
							<div className="col-xs-6">
								<Field
									as={Select}
									id="method"
									name="method"
									label="Methode"
									placeholder="Methode"
									description={getCropMethod(props.values.method)?.guideline}
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
