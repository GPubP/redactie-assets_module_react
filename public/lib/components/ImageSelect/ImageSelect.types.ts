export type ImageSelectItem<Data = { [key: string]: any }> = Data & {
	src: string;
	title: string;
	disabled?: boolean;
};

export interface ImageSelectProps {
	className?: string;
	compareSelected?: (item: ImageSelectItem) => boolean;
	dataKey?: string;
	items: ImageSelectItem[];
	selection: (ImageSelectItem | string)[];
	onSelect?: (item: ImageSelectItem) => void;
}
