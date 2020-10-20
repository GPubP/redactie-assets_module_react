import { ImageMetaListProps } from '../ImageMetaList';

export interface ImageItemProps {
	meta: ImageMetaListProps['data'];
	source: string;
	onImageClick: () => void;
}
