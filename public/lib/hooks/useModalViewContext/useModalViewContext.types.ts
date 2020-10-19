import { FC } from 'react';

import { Tab } from '../../assets.types';
import { ModalViewContextValue } from '../../context';

export type UseModalViewContext = () => ModalViewContextValue & {
	activeTabs: Tab[];
	title: string;
	ViewComponent: FC | (() => null);
};
