'use strict';

const path = require('path');
const { CheckerPlugin } = require('awesome-typescript-loader');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');


module.exports = {
    mode: "development",
    entry: {
        main: './src/index.tsx',
        // vendor: [
        //     'react',
        //     // 'react-dom',
        //     // 'react-router',
        //     // 'react-router-dom'
        // ]
    },
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        chunkFilename: "[chunkhash].js",
        publicPath: "/dist/"
    },
    module: {
        rules: [{
            test: /\.ts(x?)$/,
            exclude: /node_modules/,
            use: [{
                loader: 'awesome-typescript-loader',
                options: {
                    useBabel: true,
                    useCache: true,
                }
            }]
        }, {
            enforce: "pre",
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "source-map-loader"
        }, {
            test: /\.css$/,
            exclude: /node_modules/,
            use: 'css-loader'
        }, {
            test: /\.png$/,
            exclude: /node_modules/,
            use: 'raw-loader'
        }, {
            test: /\.html$/,
            exclude: /node_modules/,
            use: 'html-loader'
        }]
    },
    plugins: [
        new CheckerPlugin(),
        new CleanWebpackPlugin(),
        // new HtmlWebpackPlugin({
        //     template: './index.html',
        //     favicon: './favicon.ico',
        // }),
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    devServer: {
        contentBase: './',
        port: 3000,
        historyApiFallback: true,
        hot: true
    }
}