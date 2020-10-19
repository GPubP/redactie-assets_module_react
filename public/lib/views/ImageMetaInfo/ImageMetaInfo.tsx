import React, { FC } from 'react';

import { ModalViewComponentProps } from '../../assets.types';
import { ImageMetaForm } from '../../components';

const ImageMetaInfo: FC<ModalViewComponentProps> = () => {
	return <ImageMetaForm onSubmit={() => null} />;
};

export default ImageMetaInfo;
