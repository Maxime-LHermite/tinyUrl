// Mainly by following webpack doc:
// https://webpack.js.org/guides/typescript/

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const outDir = path.join(__dirname, 'dist');

// Config use for development. used by webpack-dev-server
const devConfig = {
	mode: 'development',
	devtool: 'inline-source-map',
	cache: false,
	devServer: {
		port: 3000,
		static: [path.resolve(__dirname)],
		hot: true,
		liveReload: true,
		historyApiFallback: true,
	},
};

// TODO optimizations (currently quite random)
const prodConfig = {
	mode: 'production',
	performance: {
		hints: 'warning',
		maxAssetSize: 200000,
		maxEntrypointSize: 400000,
	},
	optimization: {
		chunkIds: 'total-size',
		moduleIds: 'size',
		nodeEnv: 'production',
		flagIncludedChunks: true,
		sideEffects: true,
		usedExports: true,
		concatenateModules: true,
		emitOnErrors: false,
		checkWasmTypes: true,
		minimize: true,
	},
};

module.exports = (env, argv) => {
	let mode = argv.mode || 'development';
	mode = mode === 'development' || mode === 'production' ? mode : 'development';
	const config = {
		entry: './src/App.tsx',
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: 'ts-loader',
					exclude: /node_modules/,
				},
				{
					test: /(\.svg|\.png)$/,
					type: 'asset/resource',
				},
				{
					test: /\.css$/i,
					use: ['style-loader', 'css-loader'],
				},
				{
					test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
					type: 'asset/resource',
				},
			],
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js'],
		},
		plugins: [
			new CopyWebpackPlugin({
				patterns: [{ from: path.join(__dirname, 'public/'), to: outDir }],
			}),
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify(mode),
			}),
		],
		output: {
			filename: 'bundle.js',
			path: outDir,
			publicPath: '/',
		},

		...(mode === 'production' ? prodConfig : devConfig),
	};
	console.log('webpack config loaded: ', config.mode, config.mode === 'development' ? config.devServer : '');
	return config;
};
