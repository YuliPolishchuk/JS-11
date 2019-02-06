const path = require('path');

module.exports = {
	mode: 'production', // 'development' || 'production' 
	entry: './src/index.js',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: ['@babel/env']
				}
			}
		]
	},
	watch: true
};