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
        }]
    },
    plugins: [
        new CheckerPlugin(),
        new CleanWebpackPlugin(),
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