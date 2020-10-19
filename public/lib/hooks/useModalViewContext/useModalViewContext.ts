import { useContext, useMemo } from 'react';

import { ModalViewContext } from '../../context';

import { UseModalViewContext } from './useModalViewContext.types';

const useModalViewContext: UseModalViewContext = () => {
	const { config, mode, target, setModalView } = useContext(ModalViewContext);
	const activeTabs = useMemo(() => {
		return config[mode].tabs.map(tab => ({ ...tab, active: tab.target === target }));
	}, [config, mode, target]);
	const ViewComponent = useMemo(() => {
		const currentTab = activeTabs.find(tab => tab.target === target);
		const fallbackComponent = (): null => null;
		return currentTab?.viewComponent || fallbackComponent;
	}, [activeTabs, target]);

	const title = config[mode].title;

	return { activeTabs, config, mode, target, title, ViewComponent, setModalView };
};

export default useModalViewContext;
