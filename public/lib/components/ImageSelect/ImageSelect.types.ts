import { ImageSelectItem } from '../../assets.types';

export interface ImageSelectProps {
	/** Class that will be set on the internal wrapper div */
	className?: string;
	compareSelected?: (item: ImageSelectItem) => boolean;
	/** The key of eacht item that should be use to uniquely identify an item in the DOM */
	dataKey?: string;
	/** List of images */
	items: ImageSelectItem[];
	/** List of selected items / images */
	selection: (ImageSelectItem | string)[];
	/** Callback that is called when an image is selected */
	onSelect?: (item: ImageSelectItem) => void;
}
