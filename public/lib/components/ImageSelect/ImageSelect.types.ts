export interface ImageSelectItem {
	[key: string]: any;
	src: string;
	title: string;
}

export interface ImageSelectProps {
	dataKey?: string;
	items: ImageSelectItem[];
	selection: (ImageSelectItem | string)[];
	onSelect?: (item: ImageSelectItem) => void;
}
