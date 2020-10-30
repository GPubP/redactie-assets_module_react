import React, { FC } from 'react';

import { ImageMetaListProps } from './ImageMetaList.types';

const ImageMetaList: FC<ImageMetaListProps> = ({ data }) => {
	return (
		<dl className="a-definition-list">
			{data.name && (
				<div>
					<dt>Naam:</dt>
					<dd>{data.name}</dd>
				</div>
			)}
			{data.alt && (
				<div>
					<dt>Alt:</dt>
					<dd>{data.alt}</dd>
				</div>
			)}
			{data.title && (
				<div>
					<dt>Title:</dt>
					<dd>{data.title}</dd>
				</div>
			)}
			{data.description && (
				<div>
					<dt>description:</dt>
					<dd>{data.description}</dd>
				</div>
			)}
			{data.copyright && (
				<div>
					<dt>Copyright:</dt>
					<dd>{data.copyright}</dd>
				</div>
			)}
		</dl>
	);
};

export default ImageMetaList;
