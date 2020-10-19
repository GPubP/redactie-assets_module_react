import { Tab } from '../../assets.types';

export interface ModalViewProps {
	config: { [key: string]: { title: string; tabs: Tab[] } };
	mode: string;
	onCancel: () => void;
	onViewChange: (target: string, mode?: string) => void;
	target: string;
}
