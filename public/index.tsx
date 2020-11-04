import './main.scss';

import { IMAGE_FIELD_SETTINGS_NAME, IMAGE_UPLOAD_NAME } from './lib/assets.const';
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
