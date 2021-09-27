module.exports = {
    entry: {
        main: './src/main.js',
    },
    mode: 'production',
    // mode: 'development',
    optimization: {
        minimize: false, // b不压缩代码
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [['@babel/plugin-transform-react-jsx', { pragma: 'createElement' }]],
                    },
                },
            },
        ],
    },
}
