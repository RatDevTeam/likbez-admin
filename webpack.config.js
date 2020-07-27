const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	entry: [
		'core-js/modules/es.promise',
		'core-js/modules/es.array.iterator',
		'./src/index',
	],
	output: {
		path: path.join(__dirname, './docs'),
		publicPath: '/',
		filename: 'bundle.js',
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
		alias: {
			Public: path.resolve(__dirname, 'public/'),
			Styles: path.resolve(__dirname, 'src/styles/'),
		},
	},
	devServer: {
		historyApiFallback: true,
	},
	module: {
		rules: [
			// we use babel-loader to load our jsx and tsx files
			{
				test: /\.(ts|js)x?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.s[ac]ss$/i,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(png|jp(e*)g|svg|gif)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							name: '[path][name].[ext]',
							limit: 8192,
						},
					},
				],
			},
			{
				test: /\.(ts|js)$/,
				exclude: /node_modules/,
				loader: 'eslint-loader',
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
		}),
	],
};
