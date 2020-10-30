import { Button, Icon } from '@acpaas-ui/react-components';
import classnames from 'classnames/bind';
import React, { CSSProperties, FC } from 'react';

import { useImageLoaded } from '../../hooks';

import styles from './ImageItem.module.scss';
import { ImageItemProps } from './ImageItem.types';
import { ImageMetaList } from './ImageMetaList';

const cx = classnames.bind(styles);

const ImageItem: FC<ImageItemProps> = ({ source, meta, onImageClick }) => {
	/**
	 * Hooks
	 */

	const loaded = useImageLoaded(source);

	/**
	 * Methods
	 */

	const setImageStyles = (): CSSProperties =>
		source && loaded ? { backgroundImage: `url(${source})` } : {};

	return (
		<div className="row">
			<div className="col-xs-4">
				<div className={cx('o-image-item__thumbnail')} role="img" style={setImageStyles()}>
					<span className={cx('o-image-item__edit')}>
						<Button htmlType="button" icon="crop" onClick={onImageClick} />
					</span>
					{source ? (
						<span className="u-screen-reader-only">{meta.title}</span>
					) : (
						<Icon className={cx('o-image-item__thumbnail-icon')} name="picture-o" />
					)}
				</div>
			</div>
			<div className={cx('o-image-item__meta-list', 'col-xs-8')}>
				<ImageMetaList data={meta} />
			</div>
		</div>
	);
};

export default ImageItem;
