'use strict';

const path = require('path');
const { CheckerPlugin } = require('awesome-typescript-loader')


module.exports = {
    mode: "development",
    entry: {
        main: './src/index.tsx',
        vendor: [
            'react'
        ]
    },
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        chunkFilename: "[chunkhash].js"
    },
    module: {
        rules: [{
            test: /\.ts(x?)$/,
            exclude: /node_modules/,
            use: [{
                loader: 'awesome-typescript-loader',
                options: {
                    useBabel: true,
                    useCache: true
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
        new CheckerPlugin()
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    }
}