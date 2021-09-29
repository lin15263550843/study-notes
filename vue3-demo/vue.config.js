/* eslint-disable @typescript-eslint/no-var-requires */
// const path = require('path');
// const webpack = require('webpack');
// const { name } = require('./package.json');
// const resolve = dir => {
//     return path.join(__dirname, dir);
// };
module.exports = {
    // publicPath: process.env.NODE_ENV === 'production' ? `/${name}/` : '/',
    // outputDir: `dist/${name}`,
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    indexPath: 'index.html',
    // lintOnSave: 'development' === process.env.NODE_ENV,
    lintOnSave: 'default', //  将 lint 错误输出为编译错误
    productionSourceMap: false, // 设为 false 打包时不生成.map文件
    devServer: {
        hot: true,
        // open: true,
        port: 2222,
        // headers: {
        //     'Access-Control-Allow-Origin': '*',
        // },
        // disableHostCheck: true,
        // proxy: 'http://10.182.50.183:8080',
        // proxy: {
        //     '/emer-demand': {
        //         target: 'http://10.182.50.183:8080', // 初坤本地
        //         // target: 'http://10.182.61.122:8080', // 彭文涵本地
        //         ws: true,
        //         changeOrigin: true,
        //         pathRewrite: {
        //             '^/emer-demand': '/', // rewrite path
        //         },
        //     },
        //     '/emer-conduct': {
        //         // target: 'http://10.182.50.183:8080', // 本地
        //         ws: true,
        //         changeOrigin: true,
        //         pathRewrite: {
        //             '^/emer-conduct': '/', // rewrite path
        //         },
        //     },
        // },
    },
    configureWebpack: {
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        // resolve: {
        //     alias: {
        //         '@ant-design/icons/lib/dist$': resolve('src/assets/icons/index.ts'),
        //         '@': resolve('src'),
        //         '@assets': resolve('src/assets'),
        //         '@comm': resolve('src/commons'),
        //         '@utils': resolve('src/commons/utils'),
        //         '@comp': resolve('src/components'),
        //         '@store': resolve('src/store'),
        //         '@views': resolve('src/views'),
        //     },
        // },
        // output: {
        //     library: name,
        //     libraryTarget: 'umd',
        //     jsonpFunction: `webpackJsonp_${name}`,
        // },
    },
    chainWebpack: config => {
        // Ignore all locale files of moment.js
        // config.plugin('ignore').use(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));
        // load `moment/locale/ja.js` and `moment/locale/it.js`
        // config.plugin('ignore').use(new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zhCN|en_GB/))

        // config.resolve.alias
        //     // 配置路径别名 key, value 自行定义，比如.set('@@', resolve('src/components'))
        //     .set('@comp', resolve('src/components'))
        // config.plugins.delete('preload') // TODO: need test
        // config.plugins.delete('prefetch') // TODO: need test
        // set svg-sprite-loader
        // config.module.rule('svg').exclude.add(resolve('src/icons')).end()
        // config.module
        //     .rule('icons')
        //     .test(/\.svg$/)
        //     .include.add(resolve('src/icons'))
        //     .end()
        //     .use('svg-sprite-loader')
        //     .loader('svg-sprite-loader')
        //     .options({
        //         symbolId: 'icon-[name]'
        //     })
        //     .end()
        // set preserveWhitespace
        // config.module
        //     .rule('vue')
        //     .use('vue-loader')
        //     .loader('vue-loader')
        //     .tap(options => {
        //         options.compilerOptions.preserveWhitespace = true
        //         return options
        //     })
        //     .end()
        // 解析 geojson
        // config.module
        //     .rule('geoJson')
        //     .test(/\.geoJson$/)
        //     .use('json-loader')
        //     .loader('json-loader')
        //     .end()
        // config
        //     // https://webpack.js.org/configuration/devtool/#development
        //     .when('development' === process.env.NODE_ENV, config => config.devtool('source-map'))
        // config.when('development' !== process.env.NODE_ENV, config => {
        //     // config
        //     //     .plugin('ScriptExtHtmlWebpackPlugin')
        //     //     .after('html')
        //     //     .use('script-ext-html-webpack-plugin', [
        //     //         {
        //     //             // `runtime` must same as runtimeChunk name. default is `runtime`
        //     //             inline: /runtime\..*\.js$/
        //     //         }
        //     //     ])
        //     //     .end()
        config.optimization.splitChunks({
            chunks: 'all',
            cacheGroups: {
                vendors: {
                    name: 'chunk-vendors',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    chunks: 'initial', // only package third parties that are initially dependent
                },
                // antdv: {
                //     name: 'chunk-antdv',
                //     priority: 20,
                //     test: /[\\/]node_modules[\\/]_?lhd-ant-design-vue(.*)/,
                // },
                // commons: {
                //     name: 'chunk-commons',
                //     test: resolve('src/components'), // can customize your rules
                //     minChunks: 3, //  minimum common number
                //     priority: 5,
                //     reuseExistingChunk: true
                // }
                // jsons: {
                //     name: 'chunk-jsons',
                //     test: resolve('src/assets/jsons'), // can customize your rules
                //     minChunks: 3, //  minimum common number
                //     priority: 5,
                //     reuseExistingChunk: true
                // }
            },
        });
        // config.optimization.runtimeChunk('single')
        // })
        // config.optimization.minimize(false); // 不压缩代码
        // config.optimization.minimizer('terser').tap(args => {
        //     args[0].terserOptions.compress.drop_console = false;
        //     return args;
        // });
        // config.optimization.minimizer([
        //     new TerserPlugin({
        //         terserOptions: {
        //             ecma: undefined,
        //             warnings: false,
        //             parse: {},
        //             compress: {
        //                 drop_console: false,
        //                 drop_debugger: false,
        //                 // pure_funcs: ['console.log'], // 移除console
        //             },
        //         },
        //     }),
        // ]);
        // config.optimization.minimizer('terser').tap(args => {
        //     // 移除 console.log
        //     Object.assign(args[0].terserOptions.compress, {
        //         warnings: false,
        //         drop_console: true,
        //         drop_debugger: true,
        //         pure_funcs: ['console.log'],
        //     });
        //     return args;
        // });
    },
    css: {
        // modules: true, // 启用 CSS modules
        // extract: true, // 是否使用css分离插件
        // sourceMap: false, // 生成 .map
        loaderOptions: {
            //         // css预设器配置项
            //         // css: {
            //         //     // 这里的选项会传递给 css-loader
            //         // },
            //         // postcss: {
            //         //     // 这里的选项会传递给 postcss-loader
            //         // }
            //         scss: {
            //             prependData: `@import '@/styles/variables.scss';`,
            //         },
            less: {
                //         //     lessOptions: {
                //         //         modifyVars: {
                //         //             'primary-color': 'red',
                //         //             'link-color': 'red',
                //         //             'border-radius-base': '2px',
                //         //         },
                javascriptEnabled: true, // 允许链式调用的换行
                //         //     },
            },
        },
    },
};
