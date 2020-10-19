import classnames from 'classnames';
import React, { FC } from 'react';

const ModalViewContainer: FC<{ className?: string }> = ({ className, children }) => {
	return (
		<div className={classnames(className, 'o-modal-view-container', 'u-bg-light')}>
			{children}
		</div>
	);
};

export default ModalViewContainer;
