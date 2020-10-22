import React, { FC } from 'react';

import { ModalViewComponentProps } from '../../assets.types';
import { ModalViewData } from '../../components/Fields/ImageUpload/ImageUpload.types';
import { ModalViewContainer } from '../../components/ModalView';

const ImageSelection: FC<ModalViewComponentProps<ModalViewData>> = () => {
	return (
		<ModalViewContainer>
			<h3>Selecteer een afbeelding</h3>
		</ModalViewContainer>
	);
};

export default ImageSelection;
