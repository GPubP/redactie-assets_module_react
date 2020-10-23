const path = require('path');

const RedactionWebpackPlugin = require('@redactie/module-webpack-plugin');
const cssnano = require('cssnano');
const kebabCase = require('lodash.kebabcase');
const postcssPresetEnv = require('postcss-preset-env');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const packageJSON = require('./package.json');

const getStyleLoaders = (cssLoaderOptions = { importLoaders: 1 }, preProcessor = '') => {
	const loaders = [
		'style-loader',
		{
			loader: 'css-loader',
			options: cssLoaderOptions,
		},
		{
			loader: 'postcss-loader',
			options: {
				ident: 'postcss',
				plugins: () => [postcssPresetEnv(), cssnano({ preset: 'default' })],
			},
		},
	];

	if (preProcessor) {
		loaders.push(preProcessor);
	}

	return loaders;
};

module.exports = env => {
	const defaultConfig = {
		mode: 'production',
		entry: './public/index.tsx',
		performance: {
			hints: false,
		},
		module: {
			rules: [
				{
					test: /\.ts(x)?$/,
					use: 'ts-loader',
					include: [/public/],
				},
				{
					test: /\.css$/i,
					use: getStyleLoaders(),
					include: [/public/, /node_modules\/@a-ui\/core/, /node_modules\/cropperjs/],
				},
				{
					test: /\.module\.s[ac]ss$/i,
					use: getStyleLoaders(
						{
							modules: true,
							importLoaders: 2,
						},
						'sass-loader'
					),
					include: [/public/, /node_modules\/@a-ui\/core/],
				},
				{
					test: /\.s[ac]ss$/i,
					exclude: /\.module\.s[ac]ss$/i,
					use: getStyleLoaders({ importLoaders: 2 }, 'sass-loader'),
					include: [/public/, /node_modules\/@a-ui\/core/],
				},
			],
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js'],
		},
		plugins: [
			// add default plugins here
		],
		externals: {
			react: 'react',
			ramda: 'ramda',
			ky: 'ky',
			formik: 'formik',
			yup: 'yup',
			rxjs: 'rxjs',
			'rxjs/operators': 'rxjs/operators',
			'react-dom': 'react-dom',
			'react-router-dom': 'react-router-dom',
			'@datorama/akita': '@datorama/akita',
			'@redactie/react-router-guards': '@redactie/react-router-guards',
			'@redactie/redactie-core': '@redactie/redactie-core',
			'@redactie/utils': '@redactie/utils',
			'@redactie/roles-rights-module': '@redactie/roles-rights-module',
			'@redactie/translations-module': '@redactie/translations-module',
			'@acpaas-ui/react-components': '@acpaas-ui/react-components',
			'@acpaas-ui/react-editorial-components': '@acpaas-ui/react-editorial-components',
			'@redactie/form-renderer-module': '@redactie/form-renderer-module',
		},
		output: {
			filename: `${kebabCase(packageJSON.name)}.umd.js`,
			path: path.resolve(__dirname, 'dist'),
			libraryTarget: 'umd',
		},
	};

	if (env.analyse) {
		return {
			...defaultConfig,
			plugins: [
				...defaultConfig.plugins,
				new BundleAnalyzerPlugin(),
				new webpack.SourceMapDevToolPlugin({
					filename: `${kebabCase(packageJSON.name)}.umd.map.js`,
					publicPath: `${kebabCase(packageJSON.name + packageJSON.version)}/dist/`,
				}),
			],
		};
	}

	if (env.prod) {
		return {
			...defaultConfig,
			plugins: [
				...defaultConfig.plugins,
				new RedactionWebpackPlugin({
					moduleName: packageJSON.name,
				}),
				new webpack.SourceMapDevToolPlugin({
					filename: `${kebabCase(packageJSON.name)}.umd.js.map`,
					publicPath: `${kebabCase(packageJSON.name + packageJSON.version)}/dist/`,
				}),
			],
		};
	}

	return defaultConfig;
};
