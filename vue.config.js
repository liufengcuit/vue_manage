const CompressionPlugin = require("compression-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/manage/'
        : '/',
    devServer: {
        // proxy: {
        //     '/api': {
        //         target: 'http://192.168.0.1:3000',
        //         ws: true,
        //         changeOrigin: true
        //     }
        // }
    },
    assetsDir: 'static',
    outputDir: "dist",
    filenameHashing: true,
    /**生产环境的 source map，可以将其设置为 false 以加速生产环境构建 */
    productionSourceMap: false,
    configureWebpack: config => {
        config.externals = {
            'element-ui': 'ELEMENT',
            'vue': 'Vue',
            'vue-router': 'VueRouter',
            'axios':'axios'
        }
        if(process.env.NODE_ENV === 'production') {
            config.plugins.push(new CompressionPlugin({
                test: /\.js$|\.html|\.css/,  // 匹配文件名
                threshold: 10240, //超过100KB的数据进行压缩
                deleteOriginalAssets: false //是否删除原文件
            }))

             //生产环境自动删除console
            config.plugins.push(new TerserWebpackPlugin({
                terserOptions: {
                    ecma: undefined,
                    warnings: false,
                    parse: {},
                    compress: {},
                    mangle: true, // Note `mangle.properties` is `false` by default.
                    module: false,
                    output: null,
                    toplevel: false,
                    nameCache: null,
                    ie8: false,
                    keep_classnames: undefined,
                    keep_fnames: false,
                    safari10: false,
                }
            }))
        }
    },
    chainWebpack: config => {
        // 移除 prefetch 插件
        config.plugins.delete('prefetch-index')
        // 移除 preload 插件
        config.plugins.delete('preload-index');
    }
}