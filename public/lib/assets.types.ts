import { FC } from 'react';

import { AssetResponse } from './services/assets';

export interface NavListItem {
	description?: string;
	hasError?: boolean;
	label: string;
	onClick?: () => void;
}

export interface Tab<Data> {
	active: boolean;
	disabled?: boolean;
	id?: string;
	name: string;
	onClick?: (viewData: Data) => void;
	target: string;
	viewComponent: FC<ModalViewComponentProps<Data>>;
}

export interface ModalViewComponentProps<Data> {
	onCancel: () => void;
	onViewChange: (target: string, mode?: string, data?: Partial<Data>) => void;
	data: Data;
}

export interface AlertMessage {
	title: string;
	message: string;
	type: 'success' | 'danger';
}

export enum CropMethods {
	FREE = 'free',
	EXACT = 'exact',
	BOUNDS = 'bounds',
	RATIO = 'ratio',
}

export type SelectedAsset = Pick<AssetResponse, 'uuid' | 'data'>;
