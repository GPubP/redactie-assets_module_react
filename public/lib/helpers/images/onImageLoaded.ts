export const onImageLoaded = (
	src: string | undefined,
	onLoaded: () => void
): HTMLImageElement | null => {
	let img: HTMLImageElement | null = null;

	if (src) {
		img = new Image();
		img.onload = onLoaded;
		img.src = src;
	}

	return img;
};
