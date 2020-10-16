import classnames from 'classnames';
import { equals } from 'ramda';
import React, { FC } from 'react';

import { ImageCard } from './ImageCard';
import styles from './ImageSelect.module.scss';
import { ImageSelectItem, ImageSelectProps } from './ImageSelect.types';

const cx = classnames.bind(styles);

const ImageSelect: FC<ImageSelectProps> = ({
	className,
	dataKey,
	items = [],
	selection = [],
	onSelect = () => null,
}) => {
	const isSelected = (item: ImageSelectItem): boolean => {
		if (dataKey) {
			return selection.includes(item[dataKey]);
		}

		return !!selection.find(selected => equals(selected, item));
	};

	return (
		<div className={cx(className, 'row')}>
			{items.map((item, index) => {
				const key = `c-image-card-${dataKey ? item[dataKey] : index}`;
				const selected = isSelected(item);

				return (
					<div key={key} className="col-xs-12 col-md-3">
						<ImageCard
							className={cx('o-image-select__card')}
							onClick={() => onSelect(item)}
							selected={selected}
							imageSrc={item.src}
							title={item.title}
						/>
					</div>
				);
			})}
		</div>
	);
};

export default ImageSelect;
