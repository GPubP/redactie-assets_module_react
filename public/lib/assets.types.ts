import { FC } from 'react';

import { ModalViewData } from './components/Fields/ImageUpload/ImageUpload.types';

export interface Tab<Data> {
	active: boolean;
	disabled?: boolean;
	id?: string;
	name: string;
	target: string;
	viewComponent: FC<ModalViewComponentProps<Data>>;
}

export interface ModalViewComponentProps<Data> {
	onCancel: () => void;
	onViewChange: (target: string, mode?: string, data?: Partial<ModalViewData>) => void;
	data: Data;
}
