import { Tab } from '../../assets.types';

export interface ModalViewContextValue {
	config: { [key: string]: { title: string; tabs: Tab[] } };
	mode: string;
	target: string;
	setModalView: (target: string, mode?: string) => void;
}
