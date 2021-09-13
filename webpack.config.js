const { getModuleConfig } = require('@redactie/utils/dist/webpack');

const packageJSON = require('./package.json');

module.exports = env => {
	const defaultConfig = getModuleConfig({
		packageJSON,
		clean: true,
		styleIncludes: [
			/public/,
			/node_modules\/@a-ui\/core/,
			/node_modules\/@redactie\/cropperjs/,
		],
		sassIncludes: [/public/, /node_modules\/@a-ui\/core/],
		externals: {
			'@redactie/form-renderer-module': '@redactie/form-renderer-module',
			'@redactie/roles-rights-module': '@redactie/roles-rights-module',
			'@redactie/translations-module': '@redactie/translations-module',
		},
	})(env);

	return defaultConfig;
};
