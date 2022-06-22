const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    devtool: 'source-map',
    // 模式
    // mode: 'development', // 开发模式 生成普通 js 文件
    mode: 'production', // 生产模式 生成 .min.js 压缩文件
    // 入口
    entry: path.join(__dirname, './src/index.js'),
    // 出口
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: path.resolve(__dirname, 'dist'),
        // filename: 'testH1.js', // 生成的文件名 对应 开发模式
        filename: 'virtualSelect.min.js', // 生成的文件名 对应 生产模式
        libraryTarget: 'umd', // 支持 ems / commontjs / requirejs 规范
        // libraryTarget: 'amd' // 支持 requirejs 规范
        umdNamedDefine: true,
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        // scss: ['vue-style-loader', MiniCssExtractPlugin.loader, 'css-loader?sourceMap', 'sass-loader?sourceMap'],
                        scss: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
                        css: ['vue-style-loader', MiniCssExtractPlugin.loader, 'css-loader?sourceMap'],
                    },
                },
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
        // 使用单独生成css文件的插件，打包时会将css文件独立出去
        new MiniCssExtractPlugin({
            // 指定文件的输出路径和文件名
            filename: 'css/index.css',
        }),
    ],
};
