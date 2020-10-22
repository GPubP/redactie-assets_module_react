import { FC } from 'react';

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
	onViewChange: (target: string, mode?: string) => void;
	data: Data;
}
