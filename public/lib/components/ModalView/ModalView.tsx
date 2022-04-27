import { Button, Icon } from '@acpaas-ui/react-components';
import { ContextHeader } from '@acpaas-ui/react-editorial-components';
import classnames from 'classnames/bind';
import React, { ReactElement, useMemo } from 'react';

import { CORE_TRANSLATIONS, useCoreTranslation } from '../../connectors';
import { ModalViewData, ModalViewMode, ModalViewTarget } from '../Fields';

import styles from './ModalView.module.scss';
import { ModalViewProps } from './ModalView.types';
import { ModalViewActions } from './ModalViewActions';

const cx = classnames.bind(styles);

const ModalView = ({
	config,
	mode,
	onCancel,
	onDelete,
	onViewChange,
	onInternalSelect,
	onExternalSelect,
	target,
	data,
}: ModalViewProps<ModalViewData>): ReactElement => {
	/**
	 * Hooks
	 */
	const [t] = useCoreTranslation();
	const activeTabs = useMemo(() => {
		return config[mode].tabs.map((tab, index) => ({
			...tab,
			active: target ? tab.target === target : index === 0,
		}));
	}, [config, mode, target]);
	const currentTab = useMemo(() => {
		return activeTabs.find(tab => tab.target === target) || activeTabs[0];
	}, [activeTabs, target]);
	const isReplacing = mode === ModalViewMode.REPLACE;

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

	const onContinue = (): void => {
		// if (isReplacing) {
		// 	setImageFieldValue(null);
		// }

		onViewChange(
			ModalViewTarget.CREATE_META,
			ModalViewMode.CREATE,
			{
				externalFiles: data.externalFiles,
				selectedFiles: (data.selectedFiles || []).map(({ uuid, data }) => ({ uuid, data })),
			},
			true
		);
	};

	/**
	 * Render
	 */

	const selectedFiles = data.selectedFiles.length ? data.selectedFiles : data.externalFiles || [];

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

			<currentTab.viewComponent
				data={data}
				onCancel={onCancel}
				onDelete={onDelete}
				onViewChange={onViewChange}
				onSelect={
					currentTab.type === 'internal' ? onInternalSelect : (onExternalSelect as any)
				}
			/>

			{(currentTab.type === 'external' ||
				currentTab.target === ModalViewTarget.ADD_SELECTION) && (
				<ModalViewActions>
					<div className="row middle-xs end-xs">
						{selectedFiles.length > 0 && (
							<span className="u-text-success u-text-italic u-margin-right">
								<Icon className="u-margin-right-xs" name="check-circle" />
								{selectedFiles.length} afbeelding(en) geselecteerd
							</span>
						)}
						<Button negative onClick={onCancel}>
							{t(CORE_TRANSLATIONS['BUTTON_CANCEL'])}
						</Button>
						<Button
							className="u-margin-left-xs"
							disabled={selectedFiles.length === 0}
							onClick={onContinue}
							type={isReplacing ? 'success' : 'primary'}
						>
							{isReplacing ? 'Vervang' : t(CORE_TRANSLATIONS['BUTTON_NEXT'])}
						</Button>
					</div>
				</ModalViewActions>
			)}
		</>
	);
};

export default ModalView;
