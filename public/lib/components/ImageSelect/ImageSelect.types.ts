import { ImageSelectItem } from '../../assets.types';

export interface ImageSelectProps {
	className?: string;
	compareSelected?: (item: ImageSelectItem) => boolean;
	dataKey?: string;
	items: ImageSelectItem[];
	selection: (ImageSelectItem | string)[];
	onSelect?: (item: ImageSelectItem) => void;
}
