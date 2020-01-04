const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const MODE = process.env.npm_lifecycle_event === 'prod' ? 'production': 'development';

const common = {
	mode: MODE,
	entry: {
		main: './src/index.js', 
	},
	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new HtmlWebpackPlugin({
			title: 'elm-template',
			template: 'src/index.html',
			inject: true
		})
	],
	output: {
		filename: MODE === 'production' ? '[name].[hash].js':'index.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/'
	},
	resolve: {
		modules: [path.join(__dirname, 'src'), 'node_modules'],
		extensions: ['.js', '.elm'] 
	},
	module: {
		rules: [
			{
				test: /\.elm$/,
				exclude: [/elm-stuff/, /node_modules/], 
				use: [ 'elm-hot-webpack-loader', 
					{ loader: 'elm-webpack-loader',
						options: {
							debug: true,
							forceWatch: true
						}
					} 
				]
			}
		]
	}
}

module.exports = merge(common, {
	stats: {
		errors: true,
	},
})
