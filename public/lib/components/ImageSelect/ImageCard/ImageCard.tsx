import { Icon } from '@acpaas-ui/react-components';
import classnames from 'classnames/bind';
import React, { CSSProperties, FC } from 'react';

import styles from './ImageCard.module.scss';
import { ImageCardProps } from './ImageCard.types';

const cx = classnames.bind(styles);

const ImageCard: FC<ImageCardProps> = ({
	className,
	imageSrc,
	onClick,
	selected = false,
	title = '',
}) => {
	const setImageStyles = (): CSSProperties =>
		imageSrc ? { backgroundImage: `url(${imageSrc})` } : {};

	return (
		<div
			className={cx(className, 'm-card', 'c-image-card', {
				'c-image-card--no-img': !imageSrc,
				'c-image-card--selected': selected,
			})}
			onClick={onClick}
			onKeyPress={onClick}
			role="button"
			tabIndex={0}
		>
			<div className={cx('c-image-card__body')}>
				<div className={cx('c-image-card__preview')} role="img" style={setImageStyles()}>
					<span className="u-screen-reader-only">{title}</span>
				</div>
				<div className={cx('c-image-card__footer')}>
					<p className="u-no-margin">{title}</p>
					<div className={cx('c-image-card__check')}>
						<Icon className={cx('c-image-card__check-icon')} name="check" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default ImageCard;
