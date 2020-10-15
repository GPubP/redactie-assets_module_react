import './main.scss';

import { IMAGE_FIELD_SETTINGS_NAME } from './lib/assets.const';
import { ImageFieldSettings } from './lib/components/Fields';
import { formRendererConnector } from './lib/connectors';

formRendererConnector.api.fieldRegistry.add({
	name: IMAGE_FIELD_SETTINGS_NAME,
	module: 'assets',
	component: ImageFieldSettings,
});
