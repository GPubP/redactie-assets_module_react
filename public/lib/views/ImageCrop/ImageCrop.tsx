import React, { FC } from 'react';

import { ModalViewComponentProps } from '../../assets.types';
import { ModalViewData } from '../../components/Fields/ImageUpload/ImageUpload.types';
import { ModalViewContainer } from '../../components/ModalView';

const ImageCrop: FC<ModalViewComponentProps<ModalViewData>> = () => {
	return (
		<ModalViewContainer>
			<h3>Bijsnijden en schalen</h3>
		</ModalViewContainer>
	);
};

export default ImageCrop;
