import { Tab } from '../../assets.types';

export interface ModalViewProps<Data> {
	config: { [key: string]: { title: string; tabs: Tab<Data>[] } };
	mode: string;
	onCancel: () => void;
	onViewChange: (target: string, mode?: string) => void;
	target: string;
	data: Data;
}
