import { FC } from 'react';

export interface Tab {
	active: boolean;
	disabled?: boolean;
	id?: string;
	name: string;
	target: string;
	viewComponent: FC<ModalViewComponentProps>;
}

export interface ModalViewComponentProps {
	onCancel: () => void;
	onViewChange: (target: string, mode?: string) => void;
}
