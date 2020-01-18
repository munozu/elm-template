const dotenv = require('dotenv');
const path = require('path');
const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
const devcert = require('devcert');

dotenv.config();

const LOCALHOST = process.env.HOST_NAME ? process.env.HOST_NAME : 'localhost'
const PORT = process.env.PORT ? process.env.PORT : 3000;

async function startServer(options) {
	if(process.env.USE_HTTPS === 'yes') {
		const ssl = await devcert.certificateFor(LOCALHOST, { skipCertutilInstall: false, skipHostsFile: false	});
		options.public = LOCALHOST;
		options.https = { ...ssl };
	}
	WebpackDevServer.addDevServerEntrypoints(config, options);
	const compiler = Webpack(config);
	const server = new WebpackDevServer(compiler, options)
	server.listen(PORT, LOCALHOST, () => console.log(`server listening on port ${PORT}`));
}

startServer({
	contentBase: path.join(__dirname, 'dist'),
	historyApiFallback: true,
	inline: true,
	compress: true,
	hot: true,
})
