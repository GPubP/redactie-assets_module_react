import classnames from 'classnames/bind';
import React, { FC } from 'react';

import styles from './ModalViewContainer.module.scss';

const cx = classnames.bind(styles);

const ModalViewContainer: FC<{ className?: string }> = ({ className, children }) => {
	return <div className={cx(className, 'o-modal-view-container', 'u-bg-light')}>{children}</div>;
};

export default ModalViewContainer;
