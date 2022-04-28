import { FC } from 'react';

import { AssetResponse } from './services/assets';

export interface NavListItem {
	description?: string;
	hasError?: boolean;
	label: string;
	onClick?: () => void;
}

export interface ExternalAsset {
	content: string;
	name?: string;
	figuratively?: boolean;
	alt?: string;
	title?: string;
	description?: string;
	copyright?: string;
}

export interface Tab<Data> {
	active: boolean;
	disabled?: boolean;
	id?: string;
	name: string;
	type?: 'internal' | 'external';
	onClick?: (viewData: Data) => void;
	target: string;
	viewComponent: FC<ModalViewComponentProps<Data>> | FC<ExternalModalViewComponentProps<Data>>;
}

export type ImageSelectItem<Data = { [key: string]: any }> = Data & {
	src: string;
	title: string;
	disabled?: boolean;
};

export interface ModalViewComponentProps<Data> {
	onCancel: (isSaving?: boolean) => void;
	onDelete: () => void;
	onViewChange: (target: string, mode?: string, data?: Partial<Data>) => void;
	onSelect: (assets: ImageSelectItem<SelectedAsset>[]) => void;
	data: Data;
}

export interface ExternalModalViewComponentProps<Data> {
	onSelect: (assets: ExternalAsset[]) => void;
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
