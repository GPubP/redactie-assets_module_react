import { createContext } from 'react';

import { ModalViewContextValue } from './ModalViewContext.types';

const ModalViewContext = createContext<ModalViewContextValue>({
	config: {},
	mode: '',
	target: '',
	setModalView: () => null,
});

export default ModalViewContext;
