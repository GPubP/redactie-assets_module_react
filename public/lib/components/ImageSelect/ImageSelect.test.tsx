import { render } from '@testing-library/react';
import React, { ReactElement } from 'react';

import ImageSelect from './ImageSelect';
import { IMAGE_SELECT_ITEMS } from './ImageSelect.mock';
import { ImageSelectProps } from './ImageSelect.types';

const defaultProps = { dataKey: 'id', items: IMAGE_SELECT_ITEMS, selection: [] };

const imageSelectComponent = (
	partialProps: Partial<ImageSelectProps> = defaultProps
): ReactElement => {
	const props = { ...defaultProps, ...partialProps };
	return <ImageSelect {...props} />;
};

describe('<ImageSelect />', () => {
	it('Should render items when given', () => {
		const { container } = render(imageSelectComponent());
		const cards = container.querySelectorAll('.c-image-card');

		expect(cards).toHaveLength(IMAGE_SELECT_ITEMS.length);
	});

	it('Should set the correct selected items', () => {
		const randomIndex = 1;
		const selectedItem = IMAGE_SELECT_ITEMS[randomIndex];
		const { container } = render(
			imageSelectComponent({ dataKey: undefined, selection: [selectedItem] })
		);
		const cardEl = container.querySelectorAll('.c-image-card')[randomIndex];

		expect(cardEl).toHaveClass('c-image-card--selected');
	});

	it('Should set the correct selected items based on `dataKey`', () => {
		const randomIndex = 3;
		const selectedItem = IMAGE_SELECT_ITEMS[randomIndex];
		const { container } = render(imageSelectComponent({ selection: [selectedItem.id] }));
		const cardEl = container.querySelectorAll('.c-image-card')[randomIndex];

		expect(cardEl).toHaveClass('c-image-card--selected');
	});
});
