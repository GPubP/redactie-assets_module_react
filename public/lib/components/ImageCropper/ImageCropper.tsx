import { Spinner } from '@acpaas-ui/react-components';
import classnames from 'classnames/bind';
import React, { forwardRef, RefForwardingComponent, useState } from 'react';
import Cropper, { ReactCropperProps } from 'react-cropper';
import 'cropperjs/dist/cropper.css';

import styles from './ImageCropper.module.scss';

const cx = classnames.bind(styles);

const ImageCropper: RefForwardingComponent<HTMLImageElement, ReactCropperProps> = (
	{
		className,
		autoCrop = false,
		autoCropArea = 1,
		background = false,
		movable = false,
		ready = () => null,
		scalable = false,
		viewMode = 1,
		zoomable = false,
		zoomOnTouch = false,
		zoomOnWheel = false,
		...rest
	},
	ref
) => {
	/**
	 * Hooks
	 */

	const [imgLoading, setImgLoading] = useState(true);

	/**
	 * Methods
	 */

	const onReady = (e: Cropper.ReadyEvent<HTMLImageElement>): void => {
		if (imgLoading) {
			setImgLoading(false);
		}
		ready(e);
	};

	/**
	 * Render
	 */

	return (
		<div className={cx('o-image-cropper-container')}>
			{imgLoading && <Spinner className={cx('o-image-cropper__loader')} />}
			<Cropper
				{...rest}
				className={cx(className, 'o-image-cropper')}
				autoCrop={autoCrop}
				autoCropArea={autoCropArea}
				background={background}
				movable={movable}
				ready={onReady}
				ref={ref}
				scalable={scalable}
				viewMode={viewMode}
				zoomable={zoomable}
				zoomOnTouch={zoomOnTouch}
				zoomOnWheel={zoomOnWheel}
			/>
		</div>
	);
};

export default forwardRef(ImageCropper);
