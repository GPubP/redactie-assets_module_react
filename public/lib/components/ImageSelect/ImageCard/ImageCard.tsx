import { Icon } from '@acpaas-ui/react-components';
import classnames from 'classnames/bind';
import React, { CSSProperties, FC } from 'react';

import styles from './ImageCard.module.scss';
import { ImageCardProps } from './ImageCard.types';

const cx = classnames.bind(styles);

const ImageCard: FC<ImageCardProps> = ({
	className,
	disabled = false,
	imageSrc,
	onClick,
	selected = false,
	title = '',
}) => {
	const setImageStyles = (): CSSProperties =>
		imageSrc ? { backgroundImage: `url(${imageSrc})` } : {};

	return (
		<div
			className={cx(className, 'm-card', 'o-image-card', {
				'o-image-card--disabled': disabled,
				'o-image-card--no-img': !imageSrc,
				'o-image-card--selected': selected,
			})}
			onClick={!disabled ? onClick : undefined}
			onKeyPress={!disabled ? onClick : undefined}
			role="button"
			tabIndex={0}
		>
			<div className={cx('o-image-card__body')}>
				<div className={cx('o-image-card__preview')} role="img" style={setImageStyles()}>
					{imageSrc ? (
						<span className="u-screen-reader-only">{title}</span>
					) : (
						<Icon className={cx('o-image-card__preview-icon')} name="picture-o" />
					)}
				</div>
				<div className={cx('o-image-card__footer')}>
					<p className="u-no-margin">{title}</p>
					<div className={cx('o-image-card__check')}>
						<Icon className={cx('o-image-card__check-icon')} name="check" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default ImageCard;
