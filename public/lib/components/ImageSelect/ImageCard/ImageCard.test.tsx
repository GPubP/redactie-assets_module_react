import { fireEvent, render } from '@testing-library/react';
import React, { ReactElement } from 'react';

import ImageCard from './ImageCard';
import { ImageCardProps } from './ImageCard.types';

const defaultProps = { imageSrc: 'img-url', selected: false, title: 'image title' };

const imageCardComponent = (partialProps: Partial<ImageCardProps> = defaultProps): ReactElement => {
	const props = { ...defaultProps, ...partialProps };
	return <ImageCard {...props} />;
};

describe('<ImageCard />', () => {
	it('Should show an image when given', () => {
		const { container } = render(imageCardComponent());
		const imageEl = container.querySelector('.o-image-card__preview');
		const imageElStyles = imageEl ? window.getComputedStyle(imageEl).backgroundImage : '';

		expect(imageEl).not.toBeNull();
		expect(imageElStyles).toBe(`url(${defaultProps.imageSrc})`);
	});

	it('Should show a title when given', () => {
		const { container } = render(imageCardComponent());
		const titleEl = container.querySelector('.o-image-card__footer p');

		expect(titleEl).not.toBeNull();
		expect(titleEl).toHaveTextContent(defaultProps.title);
	});

	it('Should set the correct className if selected', () => {
		const { container } = render(imageCardComponent({ selected: true }));
		const rootEl = container.querySelector('.o-image-card');

		expect(rootEl).toHaveClass('o-image-card--selected');
	});

	it('Should trigger onClick when given and card is clicked', () => {
		const onClick = jest.fn();
		const { container } = render(imageCardComponent({ onClick }));
		const rootEl = container.querySelector('.o-image-card');

		fireEvent.click(rootEl as Element);

		expect(onClick).toHaveBeenCalled();
		expect(onClick).toHaveBeenCalledTimes(1);
	});
});
