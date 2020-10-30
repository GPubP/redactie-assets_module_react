import React, { FC } from 'react';

import { ImageMetaListProps } from './ImageMetaList.types';

const ImageMetaList: FC<ImageMetaListProps> = ({ data }) => {
	return (
		<dl className="a-definition-list">
			{data.name && (
				<>
					<dt>Naam:</dt>
					<dd>{data.name}</dd>
				</>
			)}
			{data.alt && (
				<>
					<dt>Alt:</dt>
					<dd>{data.alt}</dd>
				</>
			)}
			{data.title && (
				<>
					<dt>Title:</dt>
					<dd>{data.title}</dd>
				</>
			)}
			{data.description && (
				<>
					<dt>description:</dt>
					<dd>{data.description}</dd>
				</>
			)}
			{data.copyright && (
				<>
					<dt>Copyright:</dt>
					<dd>{data.copyright}</dd>
				</>
			)}
		</dl>
	);
};

export default ImageMetaList;
