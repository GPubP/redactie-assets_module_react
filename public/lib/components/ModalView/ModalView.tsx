import { ContextHeader } from '@acpaas-ui/react-editorial-components';
import classnames from 'classnames/bind';
import React, { ReactElement, useMemo } from 'react';

import styles from './ModalView.module.scss';
import { ModalViewProps } from './ModalView.types';

const cx = classnames.bind(styles);

const ModalView = <Data extends Record<string, any>>({
	config,
	mode,
	onCancel,
	onViewChange,
	target,
	data,
}: ModalViewProps<Data>): ReactElement => {
	/**
	 * Hooks
	 */

	const activeTabs = useMemo(() => {
		return config[mode].tabs.map((tab, index) => ({
			...tab,
			active: target ? tab.target === target : index === 0,
		}));
	}, [config, mode, target]);
	const ViewComponent = useMemo(() => {
		const currentTab = activeTabs.find(tab => tab.target === target) || activeTabs[0];
		return currentTab?.viewComponent;
	}, [activeTabs, target]);

	/**
	 * Methods
	 */

	const onTabClick = (e: MouseEvent, newTarget: string): void => {
		e.preventDefault();

		const clickedTab = activeTabs.find(tab => tab.target === newTarget);

		if (!clickedTab || clickedTab?.disabled) {
			return;
		}
		if (clickedTab.onClick) {
			clickedTab.onClick(data);
			return;
		}

		onViewChange(newTarget);
	};

	/**
	 * Render
	 */

	return (
		<>
			<ContextHeader
				className={cx('o-modal-view__header', 'u-bg-white')}
				linkProps={({ href }: { href: string }) => ({
					href,
					onClick: (e: MouseEvent) => onTabClick(e, href),
				})}
				tabs={activeTabs}
				title={config[mode].title}
			/>
			<ViewComponent data={data} onCancel={onCancel} onViewChange={onViewChange} />
		</>
	);
};

export default ModalView;
