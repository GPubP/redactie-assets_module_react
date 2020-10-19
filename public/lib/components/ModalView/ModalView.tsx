import { ContextHeader } from '@acpaas-ui/react-editorial-components';
import classnames from 'classnames/bind';
import React, { FC } from 'react';

import { useModalViewContext } from '../../hooks';

import styles from './ModalView.module.scss';

const cx = classnames.bind(styles);

const ModalView: FC = () => {
	/**
	 * Hooks
	 */

	const { activeTabs, title, target, ViewComponent, setModalView } = useModalViewContext();

	/**
	 * Methods
	 */

	const onTabClick = (e: MouseEvent, newTarget: string): void => {
		e.preventDefault();

		const clickedTab = activeTabs.find(tab => tab.target === target);

		if (!clickedTab || clickedTab?.disabled) {
			return;
		}

		setModalView(newTarget);
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
				title={title}
			/>
			<ViewComponent />
		</>
	);
};

export default ModalView;
