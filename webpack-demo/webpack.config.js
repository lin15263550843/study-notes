'use strict'
const webpack = require('webpack')
const path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        // path: 'dist',
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    // mode: 'production',
    mode: 'development',
    devServer: {
        // hot: true,
        // contentBase: './dist',
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
    },
}

// "webpack": "^5.46.0",
// "webpack-cli": "^4.7.2",

// "webpack": "^4.29.0",
// "webpack-cli": "^3.3.12",
// "webpack-dev-server": "^3.11.2"
// "dev": "webpack-dev-server --open"
// plugins: [new webpack.HotModuleReplacementPlugin()],
