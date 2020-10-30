import { ActionBar, ActionBarContentSection } from '@acpaas-ui/react-editorial-components';
import classnames from 'classnames/bind';
import React, { FC } from 'react';

import styles from './ModalViewActions.module.scss';

const cx = classnames.bind(styles);

const ModalViewActions: FC<{ className?: string }> = ({ className, children }) => {
	return (
		<ActionBar className={cx(className, 'o-modal-view-actions')} disablePortal isOpen>
			<ActionBarContentSection>{children}</ActionBarContentSection>
		</ActionBar>
	);
};

export default ModalViewActions;
