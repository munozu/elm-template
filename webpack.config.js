const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: {
		main: './src/index.js', 
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		overlay: true,
		hot: true,
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: 'Elm-Webpack',
			template: 'src/index.html',
			inject: true
		})
	],
	output: {
		filename: '[name].[hash].js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/'
	},
	stats: {
		errors: true,
	},
	module: {
		rules: [
			{
				test: /\.elm$/,
				exclude: [/elm-stuff/, /node_modules/], 
				use: [ 'elm-hot-webpack-loader', 'elm-webpack-loader' ]
			}
		]
	}
}
