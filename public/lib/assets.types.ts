import { FC } from 'react';

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
