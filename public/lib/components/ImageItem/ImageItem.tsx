import React, { FC } from 'react';

import { ImageMetaList } from '../ImageMetaList';

import { ImageItemProps } from './ImageItem.types';

const ImageItem: FC<ImageItemProps> = ({ source, meta }) => {
	return (
		<div className="row">
			<img src={source} alt={meta.alt} />
			<div>
				<ImageMetaList data={meta} />
			</div>
		</div>
	);
};

export default ImageItem;
