const path = require('path');
const merge = require('webpack-merge');
const Webpack = require('webpack');
const ClosurePlugin = require('closure-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const MODE = process.env.npm_lifecycle_event === 'prod' ? 'production' : 'development';

const common = {
	mode: MODE,
	entry: {
		main: './src/index.js', 
	},
	output: {
		filename: MODE === 'production' ? '[name].[hash].js' : 'index.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
	},
	devtool: 'inline-source-map',
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			inject: true
		})
	],
	resolve: {
		modules: [path.join(__dirname, 'src'), 'node_modules'],
		extensions: ['.js', '.elm']
	},
	module: {
		rules: [
			{ test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{ test: /\.elm$/,
				exclude: [/elm-stuff/, /node_modules/], 
				use: [ 'elm-webpack-loader' ]
			}
		]
	}
}

if (MODE === 'development') {
	console.log('Building for dev');
	module.exports = merge(common, {
		plugins: [
			// suggeseted for hot loading
			new Webpack.NamedModulesPlugin(),
			// prevents compilation erros cause the hot loader to lose state
			new Webpack.NoEmitOnErrorsPlugin()
		],
		module: {
			rules: [
				{ test: /\.elm$/,
					exclude: [/elm-stuff/, /node_modules/],
					use: [ 'elm-hot-webpack-loader',
						{ loader: 'elm-webpack-loader',
							options: {
								// elm debugger overlay
								debug: true,
								forceWatch: true
							}
						}
					]
				}
			]
		},
		// devServer: {
		// 	inline: true,
		// 	stats: 'errors-only',
		// 	contentBase: path.join(__dirname, 'src/assets'),
		// 	open: true,
		// 	historyApiFallback: true,
		// },
	})
}

if (MODE === 'production') {
	console.log('Building fro Production...');
	module.exports = merge(common, {
		plugins: [
			new CleanWebpackPlugin(['dist'], {
				root: __dirname,
				exclude: [],
				verbose: true,
				dry: false
			}),
			new CopyWebpackPlugin([
				{
					from: 'src/assets'
				}
			])
		],
		module: {
			rules: [
				{ test: /\.elm$/,
					exclude: [/elm-stuff/, /node_modules/],
					use: {
						loader: 'elm-webpack-loader',
						options: {
							optimize: true
						}
					}
				}
			]
		},
		optimization: {
			minimizer: [
				new ClosurePlugin({mode: 'STANDARD'}, {
					// compiler flags here
					//
					// for debugging help, try these:
					//
					// formatting: 'PRETTY_PRINT',
					// debug: true
					// renaming: false
				})
			]
		}
	})
}
