const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');

module.exports = {
    entry: [
        path.resolve(__dirname, "src/index.js"),
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].js',
        publicPath: '/',
    },
    // Transform all txt file to valid module (maybe to javascript file) by raw loader
    module: {
        rules: [{
            test: /\.txt$/,
            use: 'raw-loader'
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader',]
        },
        {
            test: /\.(png|svg|jpg|gif)$/,
            loader: 'file-loader',
            options: {
                outputPath: 'assets/images',
            },
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: [
                'file-loader',
            ],
        },
        {
            test: /\.xml$/,
            use: [
                'xml-loader',
            ],
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ["@babel/preset-env"]  //Preset used for env setup
                }
            },

        }
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Caching'
        }),
    ]
}