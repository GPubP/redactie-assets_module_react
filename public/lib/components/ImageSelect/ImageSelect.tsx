import classnames from 'classnames';
import { equals } from 'ramda';
import React, { FC } from 'react';

import { ImageSelectItem } from '../../assets.types';

import { ImageCard } from './ImageCard';
import styles from './ImageSelect.module.scss';
import { ImageSelectProps } from './ImageSelect.types';

const cx = classnames.bind(styles);

/**
 * Renders a list of selectable images
 *
 * ```tsx
 * export const wrapperComponent = () => {
 * 	const assets = [{
 *		data: {
 *			"name": "Het eiland",
 *			"category": "image",
 *			"description": "",
 *			"copyright": "",
 *			"file": {
 *				"type": {
 *					"mime": "image/jpeg",
 *					"extension": "jpeg"
 *				},
 *				"size": 152560,
 *				"reference": "19374b49-ae12-4638-8a13-bd6f78bb5257",
 *				"name": "eiland.jpeg"
 *			},
 *			"parent": null,
 *			"thumbnail": "01485c10-a6ef-4209-96d2-6565fc760975",
 *			"metaData": {
 *				"width": 1400,
 *				"height": 788
 *			},
 *			"type": "source",
 *			"attributes": {
 *				"alt": "Het eiland",
 *				"title": "Het eiland"
 *			},
 *			"figuratively": false,
 *			"translations": [
 *				{
 *					"data": {
 *						"name": "Het eiland",
 *						"description": "",
 *						"copyright": "",
 *						"figuratively": false,
 *						"title": "Het eiland",
 *						"alt": "Het eiland"
 *					},
 *					"lang": "nl"
 *				}
 *			]
 *		},
 * 		src: `${baseUrl}/${assetId}/file?x-tenant-id=${CoreConfig.tenantId}`;
 *		title: "Het eiland";
 *		disabled: false;
 *		uuid: "939620e9-8599-4cdf-829b-bf496836a939"
 * 	}];
 * 	const selectedAssets = [];
 *
 * 	const onImageSelect = (item: ImageSelectItem): void => {
 * 		// ...
 * 	}
 * 	return (
 * 		<ImageSelect
 *			items={assets}
 *			selection={selectedAssets}
 *			onSelect={onImageSelect}
 *		/>
 * 	);
 * };
 * ```
 */
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
