import { ImageSelectItem, SelectedAsset, Tab } from '../../assets.types';

export interface ModalViewProps<Data> {
	config: { [key: string]: { title: string; tabs: Tab<Data>[] } };
	mode: string;
	onCancel: () => void;
	onDelete: () => void;
	onViewChange: (
		target: string,
		mode?: string,
		data?: Partial<Data>,
		keepFiles?: boolean
	) => void;
	onExternalSelect: (files: any[]) => void;
	onInternalSelect: (items: SelectedAsset[]) => void;
	onSelect?: (assets: ImageSelectItem<SelectedAsset>[]) => void;
	target: string;
	data: Data;
}
