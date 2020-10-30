import { Button } from '@acpaas-ui/react-components';
import { TranslateFunc } from '@redactie/translations-module';
import React from 'react';

import { CropMethods } from '../../../assets.types';
import { CORE_TRANSLATIONS } from '../../../connectors/translations';
import { CROP_METHODS } from '../../Forms/ImageCropSettingsForm';

import { CropOption } from './ImageFieldSettings.types';

export const IMAGE_CROP_COLUMNS = (t: TranslateFunc, onClick: (id: string) => void): any[] => [
	{
		label: t(CORE_TRANSLATIONS.TABLE_NAME),
		value: 'name',
		disableSorting: true,
		component(value: string, rowData: CropOption) {
			const { guideline } = rowData;
			return (
				<>
					<p>{value}</p>
					{guideline && <small>{guideline}</small>}
				</>
			);
		},
	},
	{
		label: 'Methode',
		value: 'method',
		disableSorting: true,
		component(value: string) {
			const option = CROP_METHODS.find(option => option.value === value);
			return <span>{option?.label}</span>;
		},
	},
	{
		label: '',
		classList: ['u-text-right'],
		disableSorting: true,
		component(value: unknown, rowData: CropOption) {
			const { id } = rowData;

			return (
				<Button
					ariaLabel="Edit"
					icon="edit"
					htmlType="button"
					onClick={() => onClick(id)}
					type="primary"
					transparent
				/>
			);
		},
	},
];

export const INITIAL_IMAGE_CROP_SETTINGS_FORM_VALUES: CropOption = {
	id: '',
	name: '',
	guideline: '',
	method: CropMethods.FREE,
	ratioDimensions: {
		x: 0,
		y: 0,
	},
	boundsDimensions: {
		minWidth: 0,
		minHeight: 0,
		maxWidth: 0,
		maxHeight: 0,
	},
	exactDimensions: {
		width: 0,
		height: 0,
	},
};
