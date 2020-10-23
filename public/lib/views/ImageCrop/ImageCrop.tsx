import React, { FC } from 'react';

import { ModalViewComponentProps } from '../../assets.types';
import { ModalViewContainer, ModalViewData } from '../../components';

const ImageCrop: FC<ModalViewComponentProps<ModalViewData>> = () => {
	return (
		<ModalViewContainer>
			<h3>Bijsnijden en schalen</h3>
		</ModalViewContainer>
	);
};

export default ImageCrop;
