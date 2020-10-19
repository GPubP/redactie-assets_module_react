import React, { FC } from 'react';

import { ModalViewComponentProps } from '../../assets.types';
import { ModalViewContainer } from '../../components/ModalView';

const ImageCrop: FC<ModalViewComponentProps> = () => {
	return (
		<ModalViewContainer>
			<h3>Bijsnijden en schalen</h3>
		</ModalViewContainer>
	);
};

export default ImageCrop;
