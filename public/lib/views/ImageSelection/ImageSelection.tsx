import React, { FC } from 'react';

import { ModalViewComponentProps } from '../../assets.types';
import { ModalViewContainer } from '../../components/ModalView';

const ImageSelection: FC<ModalViewComponentProps> = () => {
	return (
		<ModalViewContainer>
			<h3>Selecteer een afbeelding</h3>
		</ModalViewContainer>
	);
};

export default ImageSelection;
