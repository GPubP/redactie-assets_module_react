import './main.scss';
import React, { FC, useEffect } from 'react';

import { registerAssetsAPI } from './lib/api';
import { registerAssetsProvider } from './lib/api/registerAssetsProvider';
import { IMAGE_FIELD_SETTINGS_NAME, IMAGE_UPLOAD_NAME } from './lib/assets.const';
import { ExternalModalViewComponentProps } from './lib/assets.types';
import { ModalViewContainer, ModalViewData } from './lib/components';
import { ImageView } from './lib/components/CCViews';
import { ImageFieldSettings, ImageUpload } from './lib/components/Fields';
import { formRendererConnector } from './lib/connectors';

formRendererConnector.api.fieldRegistry.add([
	{
		name: IMAGE_FIELD_SETTINGS_NAME,
		module: 'assets',
		component: ImageFieldSettings,
	},
	{
		name: IMAGE_UPLOAD_NAME,
		module: 'assets',
		component: ImageUpload,
		viewComponent: ImageView,
	},
]);

registerAssetsAPI();
