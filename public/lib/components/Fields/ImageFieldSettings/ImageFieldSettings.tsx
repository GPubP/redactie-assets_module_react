import { Button, TextField } from '@acpaas-ui/react-components';
import { Table } from '@acpaas-ui/react-editorial-components';
import { InputFieldProps } from '@redactie/form-renderer-module';
import { FormikOnChangeHandler } from '@redactie/utils';
import { Field, Formik } from 'formik';
import React, { FC, ReactElement, useMemo, useState } from 'react';

import { useCoreTranslation } from '../../../connectors/translations';
import { ImageCropSettingsForm } from '../../Forms';

import { IMAGE_CROP_COLUMNS } from './ImageFieldSettings.const';
import { CropOption, CropTableRow, ImageFieldSettingsFormState } from './ImageFieldSettings.types';

const ImageFieldSettings: FC<InputFieldProps> = ({ fieldSchema, fieldProps, fieldHelperProps }) => {
	const { name, label, config = {} } = fieldSchema;
	const { field } = fieldProps;

	/**
	 * Hooks
	 */
	const [t] = useCoreTranslation();
	const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

	const initialValues: ImageFieldSettingsFormState = useMemo(() => {
		if (!field.value || field.value === '') {
			return {
				minHeight: 0,
				minWidth: 0,
				cropOptions: [],
			};
		}
		return (field.value as unknown) as ImageFieldSettingsFormState;
	}, [field.value]);

	/**
	 * Functions
	 */
	const onSubmit = (values: ImageFieldSettingsFormState): void => {
		fieldHelperProps.setValue(values);
	};

	const expandRow = (rowId: string): void => {
		setExpandedRows({
			[rowId]: true,
		});
	};

	const updateCropOptions = (row: CropOption): void => {
		console.log('update crop option', row);
	};

	/**
	 * Render
	 */
	const renderExpantionTemplate = (row: CropTableRow): ReactElement => {
		return (
			<ImageCropSettingsForm initialValues={row} onSubmit={updateCropOptions}>
				{({ submitForm }) => {
					return (
						<div className="u-wrapper row end-xs">
							<Button onClick={submitForm} type="success">
								Wijzig
							</Button>
							<Button className="u-margin-left-xs" type="success" negative>
								Annuleer
							</Button>
						</div>
					);
				}}
			</ImageCropSettingsForm>
		);
	};

	const renderDimensions = (): ReactElement => (
		<>
			<div className="row">
				<div className="col-xs-6 row">
					<div className="col-xs-6">
						<Field
							as={TextField}
							label="Minimumbreedte"
							id="minWidth"
							name="minWidth"
							min={0}
							type="number"
						/>
					</div>
					<div className="col-xs-6">
						<Field
							as={TextField}
							label="MinimumHoogte"
							id="minHeight"
							name="minHeight"
							min={0}
							type="number"
						/>
					</div>
				</div>
			</div>
		</>
	);

	const renderCropTable = (values: ImageFieldSettingsFormState): ReactElement => {
		const rows: CropTableRow[] =
			values.cropOptions?.map((crop, index) => ({
				id: `crop-item-${index}`,
				...crop,
			})) || [];

		return (
			<Table
				className="u-margin-top"
				columns={IMAGE_CROP_COLUMNS(t, expandRow)}
				rows={rows}
				expandedRows={expandedRows}
				totalValues={rows.length}
				rowExpansionTemplate={renderExpantionTemplate}
			/>
		);
	};

	return (
		<>
			<Formik enableReinitialize onSubmit={onSubmit} initialValues={initialValues}>
				{({ values }) => {
					return (
						<>
							<FormikOnChangeHandler
								onChange={values => onSubmit(values as ImageFieldSettingsFormState)}
							/>
							{renderDimensions()}
							{renderCropTable(values)}
						</>
					);
				}}
			</Formik>
		</>
	);
};

export default ImageFieldSettings;
