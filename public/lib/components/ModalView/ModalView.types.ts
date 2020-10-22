import { Tab } from '../../assets.types';
import { ModalViewData } from '../Fields/ImageUpload/ImageUpload.types';

export interface ModalViewProps<Data> {
	config: { [key: string]: { title: string; tabs: Tab<Data>[] } };
	mode: string;
	onCancel: () => void;
	onViewChange: (target: string, mode?: string, data?: Partial<ModalViewData>) => void;
	target: string;
	data: Data;
}
