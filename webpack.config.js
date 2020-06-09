'use strict';

const path = require('path');
const { CheckerPlugin } = require('awesome-typescript-loader');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');



module.exports = {
    mode: "development",
    entry: {
        main: './src/index.tsx',
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
    optimization: {
        minimizer: []
    },
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