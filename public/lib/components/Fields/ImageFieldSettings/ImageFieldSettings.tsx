import { Button, TextField } from '@acpaas-ui/react-components';
import { Table } from '@acpaas-ui/react-editorial-components';
import { InputFieldProps } from '@redactie/form-renderer-module';
import { FormikOnChangeHandler } from '@redactie/utils';
import classNames from 'classnames/bind';
import { Field, Formik } from 'formik';
import React, { FC, ReactElement, useMemo, useState } from 'react';

import { formRendererConnector } from '../../../connectors/formRenderer';
import { useCoreTranslation } from '../../../connectors/translations';
import { ImageCropSettingsForm } from '../../Forms';

import {
	IMAGE_CROP_COLUMNS,
	INITIAL_IMAGE_CROP_SETTINGS_FORM_VALUES,
} from './ImageFieldSettings.const';
import styles from './ImageFieldSettings.module.scss';
import { CropOption, ImageFieldSettingsFormState } from './ImageFieldSettings.types';

const cx = classNames.bind(styles);

const ImageFieldSettings: FC<InputFieldProps> = ({ fieldSchema, fieldProps, fieldHelperProps }) => {
	const { label } = fieldSchema;
	const { field } = fieldProps;

	/**
	 * Hooks
	 */
	const [t] = useCoreTranslation();
	const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
	const [showCropSettingsForm, setShowCropSettingsForm] = useState(false);

	const initialValues: ImageFieldSettingsFormState = useMemo(() => {
		if (!field.value || field.value === '') {
			return {
				minHeight: 0,
				minWidth: 0,
				cropOptions: [],
			};
		}

		const value = (field.value as unknown) as ImageFieldSettingsFormState;

		return {
			...value,
			cropOptions:
				(value?.cropOptions || []).map((crop, index) => ({
					...crop,
					id: `crop-item-${index}`,
				})) || [],
		};
	}, [field.value]);

	/**
	 * Functions
	 */
	const onSubmit = (values: ImageFieldSettingsFormState): void => {
		fieldHelperProps.setValue(values);
	};

	const expandRow = (rowId: string): void => {
		setShowCropSettingsForm(false);
		setExpandedRows({
			[rowId]: true,
		});
	};

	const addCropOption = (cropOption: CropOption): void => {
		fieldHelperProps.setValue({
			...initialValues,
			cropOptions: [...initialValues.cropOptions, cropOption],
		});
		setShowCropSettingsForm(false);
	};

	const deleteCropOption = (cropOption: CropOption): void => {
		fieldHelperProps.setValue({
			...initialValues,
			cropOptions: initialValues.cropOptions.filter(option => option.id !== cropOption.id),
		});
		setShowCropSettingsForm(false);
	};

	const updateCropOptions = (cropOption: CropOption): void => {
		fieldHelperProps.setValue({
			...initialValues,
			cropOptions: initialValues.cropOptions.map(option => {
				if (option.id !== cropOption.id) {
					return option;
				}

				return {
					...option,
					...cropOption,
				};
			}),
		});
		setExpandedRows({});
	};

	/**
	 * Render
	 */
	const renderExpantionTemplate = (row: CropOption): ReactElement => {
		return (
			<div className={cx('o-image-field-settings__expanded-row')}>
				<ImageCropSettingsForm initialValues={row} onSubmit={updateCropOptions}>
					{({ submitForm }) => {
						return (
							<div className="row start-xs">
								<Button
									className="u-margin-left-xs"
									onClick={submitForm}
									htmlType="button"
									size="small"
									type="primary"
								>
									Wijzig
								</Button>
								<Button
									className="u-margin-left-xs"
									type="primary"
									size="small"
									onClick={() => setExpandedRows({})}
									outline
								>
									Annuleer
								</Button>
								<Button
									className="u-margin-left-xs"
									onClick={() => deleteCropOption(row)}
									negative
									size="small"
									icon="trash"
									ariaLabel="Delete crop"
									type="secondary"
									htmlType="button"
								/>
							</div>
						);
					}}
				</ImageCropSettingsForm>
			</div>
		);
	};

	const renderDimensions = (): ReactElement => (
		<>
			<div className="u-border-bottom u-margin-bottom">
				<div className="row">
					<div className="col-xs-12 col-lg-8 col-xl-7 row">
						<div className="col-xs-12 col-sm-6 col-md-5 row middle-xs u-flex-no-wrap">
							<div className="col-xs-11">
								<Field
									as={TextField}
									label="Minimumbreedte"
									id={`${field.name}.minWidth`}
									name={`${field.name}.minWidth`}
									required={true}
									min={0}
									type="number"
								/>
								<formRendererConnector.api.ErrorMessage
									name={`${field.name}.minWidth`}
								/>
							</div>
							<div className="col-xs-1 u-margin-top">
								<small className="suffix-neg-margin-left">px</small>
							</div>
						</div>
						<div
							className={cx(
								'o-image-field-settings__min-max-divider',
								'col-md-2 flex-align-self-center'
							)}
						>
							op
						</div>
						<div className="col-xs-12 col-sm-6 col-md-5 row middle-xs u-flex-no-wrap">
							<div className="col-xs-11">
								<Field
									as={TextField}
									label="Minimumhoogte"
									id={`${field.name}.minHeight`}
									name={`${field.name}.minHeight`}
									required={true}
									min={0}
									type="number"
								/>

								<formRendererConnector.api.ErrorMessage
									name={`${field.name}.minHeight`}
								/>
							</div>
							<div className="col-xs-1 u-margin-top">
								<small className="suffix-neg-margin-left">px</small>
							</div>
						</div>
					</div>
				</div>
				<div className="u-margin-bottom a-input">
					<small>
						bepaal de minimale breedte en/of hoogte voor de afbeelding. Laat een veld
						leeg of gebruik een nul als je geen restricties wil opleggen.
					</small>
				</div>
			</div>
		</>
	);

	const renderCropTable = (values: ImageFieldSettingsFormState): ReactElement => {
		return (
			<Table
				dataKey="id"
				className="u-margin-top"
				columns={IMAGE_CROP_COLUMNS(t, expandRow)}
				rows={values.cropOptions}
				expandedRows={expandedRows}
				totalValues={values.cropOptions.length}
				rowExpansionTemplate={renderExpantionTemplate}
				noDataMessage="Geen crops beschikbaar."
			/>
		);
	};

	return (
		<>
			{renderDimensions()}
			<Formik enableReinitialize onSubmit={onSubmit} initialValues={initialValues}>
				{({ values }) => {
					return (
						<>
							<FormikOnChangeHandler
								onChange={values => onSubmit(values as ImageFieldSettingsFormState)}
							/>
							<h3 className="h6">{label}</h3>
							{renderCropTable(values)}
						</>
					);
				}}
			</Formik>
			<formRendererConnector.api.ErrorMessage name={`${field.name}.cropOptions`} />
			{showCropSettingsForm && (
				<div className="u-margin-top">
					<ImageCropSettingsForm
						initialValues={INITIAL_IMAGE_CROP_SETTINGS_FORM_VALUES}
						onSubmit={addCropOption}
					>
						{({ submitForm }) => {
							return (
								<div className="row start-xs">
									<Button
										className="u-margin-left-xs"
										onClick={submitForm}
										size="small"
										type="primary"
									>
										Maak aan
									</Button>
									<Button
										onClick={() => setShowCropSettingsForm(false)}
										className="u-margin-left-xs"
										type="primary"
										size="small"
										outline
									>
										Annuleer
									</Button>
								</div>
							);
						}}
					</ImageCropSettingsForm>
				</div>
			)}

			{!showCropSettingsForm && (
				<Button
					className="u-margin-top"
					onClick={() => {
						setExpandedRows({});
						setShowCropSettingsForm(true);
					}}
					iconLeft="plus"
					type="primary"
				>
					Optie toevoegen
				</Button>
			)}
		</>
	);
};

export default ImageFieldSettings;
