import { useEffect, useState } from 'react';

import { onImageLoaded } from '../../helpers';

export const useImageLoaded = (source: string | undefined): boolean => {
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		let img = onImageLoaded(source, () => setLoaded(true));

		return () => {
			if (img) {
				// Prevent state updates to happen after component has already been destroyed
				img.onload = () => null;
				img = null;
			}
		};
	}, [source]);

	return loaded;
};
