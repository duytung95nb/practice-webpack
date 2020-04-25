const merge = require('webpack-merge');
const common = require('./webpack.common');
const webpack = require('webpack');

module.exports = merge(common,
    {
        mode: 'development',
        devtool: 'inline-source-map',
        entry: [
            'webpack-hot-middleware/client'
        ],
        devServer: {
            contentBase: './dist',
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
        ]
    });