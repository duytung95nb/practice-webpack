const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './index.js', // this one is default
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js' // default one
    },
    // Transform all txt file to valid module (maybe to javascript file) by raw loader
    module: {
        rules: [
            { test: /\.txt$/, use: 'raw-loader' }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({template: './index.html'})
    ],
    mode: "none"
}