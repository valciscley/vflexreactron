const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const path = require('path');

module.exports = {
	entry: './index.js',									// define o ponto de entrada como index.js
	output: {
		filename: 'bundle.js',								// define o nome do 'bundle' javascript gerado
		path: path.resolve(__dirname, 'prod')				// define o diretório de produção
	},
	plugins: [
		new HtmlWebpackPlugin(								// define o arquivo html de template
			{template: 'index.html'}
		),
		new CopyPlugin({
			patterns: [
			  { from: "publico", to: "publico" }
			]
		}),
		new TerserPlugin({
			terserOptions: {
			  format: {
				comments: false,
			  },
			},
			extractComments: false,
		})
	],
	resolve: {
		modules: [__dirname, 'src', 'node_modules'],
		extensions: ['.js'],
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: require.resolve('babel-loader')
			},
			{
				test:/\.css$/,
				use:['style-loader','css-loader']
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/,
				use: ['file-loader']
			}
		]
	},
	performance: {
		hints: false,
		maxEntrypointSize: 512000,
		maxAssetSize: 512000
	}
}
