export interface ImageSelectItem {
	[key: string]: any;
	src: string;
	title: string;
	disabled?: boolean;
}

export interface ImageSelectProps {
	className?: string;
	dataKey?: string;
	items: ImageSelectItem[];
	selection: (ImageSelectItem | string)[];
	onSelect?: (item: ImageSelectItem) => void;
}
