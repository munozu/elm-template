const path = require('path');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

const options = {
	contentBase: path.join(__dirname, 'dist'),
	inline: true,
	compress: true,
	overlay: true,
	hot: true,
	historyApiFallback: true
};

const compiler = webpack(config);
const server = new webpackDevServer(compiler, options)

server.listen(3000, 'localhost', () => {
	console.log('Listening on port 3000');
});
