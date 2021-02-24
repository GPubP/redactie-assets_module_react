import { Tab } from '../../assets.types';

export interface ModalViewProps<Data> {
	config: { [key: string]: { title: string; tabs: Tab<Data>[] } };
	mode: string;
	onCancel: () => void;
	onDelete: () => void;
	onViewChange: (target: string, mode?: string, data?: Partial<Data>) => void;
	target: string;
	data: Data;
}
