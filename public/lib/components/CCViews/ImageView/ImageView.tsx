import { Icon } from '@acpaas-ui/react-components';
import { ViewFieldProps } from '@redactie/form-renderer-module';
import React, { FC, useMemo } from 'react';

import { getAssetUrl } from '../../../helpers';
import { useImageLoaded } from '../../../hooks';
import { ImageFieldValue } from '../../Fields';

const ImageView: FC<ViewFieldProps> = ({ value }) => {
	const { meta, original } = value as ImageFieldValue;
	const src = useMemo(() => getAssetUrl(original?.asset?.uuid), [original]);
	const loaded = useImageLoaded(src);

	return (
		<div className="u-margin-bottom">
			<figure className="m-image">
				{src && loaded ? (
					<img src={src} alt={meta?.alt || ''} title={meta?.title || ''} />
				) : null}
				{meta?.copyright ? (
					<div className="m-image__copyright a-copyright" aria-haspopup="true">
						<div className="a-copyright__sign">
							<Icon name="copyright" />
						</div>
						<span className="a-copyright__label">{meta.copyright}</span>
					</div>
				) : null}
			</figure>
		</div>
	);
};

export default ImageView;
