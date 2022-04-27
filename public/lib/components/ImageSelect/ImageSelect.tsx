import classnames from 'classnames';
import { equals } from 'ramda';
import React, { FC } from 'react';

import { ImageSelectItem } from '../../assets.types';

import { ImageCard } from './ImageCard';
import styles from './ImageSelect.module.scss';
import { ImageSelectProps } from './ImageSelect.types';

const cx = classnames.bind(styles);

const ImageSelect: FC<ImageSelectProps> = ({
	className,
	compareSelected,
	dataKey,
	items = [],
	selection = [],
	onSelect = () => null,
}) => {
	const isSelected = (item: ImageSelectItem): boolean => {
		if (dataKey) {
			return selection.includes(item[dataKey]);
		}

		if (compareSelected) {
			return compareSelected(item);
		}

		return !!selection.find(selected => equals(selected, item));
	};

	return (
		<div className={cx(className, 'row')}>
			{items.map((item, index) => {
				const key = `o-image-card-${dataKey ? item[dataKey] : index}`;
				const selected = isSelected(item);

				return (
					<div key={key} className="col-xs-12 col-md-6 col-lg-3 u-margin-bottom">
						<ImageCard
							className={cx('o-image-select__card')}
							disabled={item.disabled}
							imageSrc={item.src}
							onClick={() => onSelect(item)}
							selected={selected}
							title={item.title}
						/>
					</div>
				);
			})}
		</div>
	);
};

export default ImageSelect;
