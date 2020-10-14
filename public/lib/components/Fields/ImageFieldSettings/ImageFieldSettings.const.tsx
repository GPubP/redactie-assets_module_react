import { Button } from '@acpaas-ui/react-components';
import { TranslateFunc } from '@redactie/translations-module';
import { CORE_TRANSLATIONS } from '@redactie/translations-module/public/lib/i18next/translations.const';
import React from 'react';

import { CropMethods, CropTableRow } from './ImageFieldSettings.types';

export interface CropMethodFieldOption {
	key: string;
	value: string;
	label: string;
	guideline: string;
}

export const CROP_METHODS: CropMethodFieldOption[] = [
	{
		key: '1',
		value: CropMethods.FREE,
		label: 'Vrije crop',
		guideline: 'De afbeelding mag vrij bijgesneden worden.',
	},
	{
		key: '2',
		value: CropMethods.EXACT,
		label: 'Exact crop',
		guideline:
			'De afbeelding wordt bijgesneden aan de hand van de opgegeven hoogte en breedte.',
	},
	{
		key: '3',
		value: CropMethods.BOUNDS,
		label: 'Begrensde crop',
		guideline: 'De afbeelding mag vrij bijgesneden worden binnen bepaalde grenzen.',
	},
	{
		key: '4',
		value: CropMethods.RATIO,
		label: 'Ratio crop',
		guideline:
			'De afbleelding wordt bijgesneden aan de hand van het opgegeven formaat (bv: 16:9)',
	},
];

export const IMAGE_CROP_COLUMNS = (t: TranslateFunc, onClick: (id: string) => void): any[] => [
	{
		label: t(CORE_TRANSLATIONS.TABLE_NAME),
		value: 'name',
		disableSorting: true,
		component(value: string, rowData: CropTableRow) {
			const { guideline } = rowData;
			return (
				<>
					<label>{value}</label>
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
		component(value: unknown, rowData: CropTableRow) {
			const { id } = rowData;

			return (
				<Button
					ariaLabel="Edit"
					icon="edit"
					onClick={() => onClick(id)}
					type="primary"
					transparent
				/>
			);
		},
	},
];
