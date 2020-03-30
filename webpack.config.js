const path = require('path');

module.exports = {
    mode: "development",
    entry: {
        main: './src/index.js',
        
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/react'],
                    cacheDirectory: true
                }
            }
        },{
            test: /\.css$/,
            exclude: /node_modules/,
            use: 'css-loader'
        },{
            test: /\.png$/,
            exclude: /node_modules/,
            use: 'raw-loader'
        }, {
            test: /\.html$/,
            exclude: /node_modules/,
            use: 'html-loader'
        }]
    },
    plugins: []
}