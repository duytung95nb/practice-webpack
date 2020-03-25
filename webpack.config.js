const path = require('path');
const TerserJSPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: {
        app: './src/index.js', // this one is default
        print: './src/script/print.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js', // default one
        publicPath: 'http://localhost:8080/',
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
    },
    // optimization: {
    //     runtimeChunk: 'single',
    //     splitChunks: {
    //         chunks: 'async',
    //         minSize: 30000,
    //         minRemainingSize: 0,
    //         maxSize: 0,
    //         minChunks: 1,
    //         maxAsyncRequests: 6,
    //         maxInitialRequests: 4,
    //         automaticNameDelimiter: '~',
    //         automaticNameMaxLength: 30,
    //         cacheGroups: {
    //             defaultVendors: {
    //                 test: /[\\/]node_modules[\\/]/,
    //                 priority: -10
    //             },
    //             default: {
    //                 minChunks: 2,
    //                 priority: -20,
    //                 reuseExistingChunk: true
    //             }
    //         }
    //     },
    //     minimizer: [new TerserJSPlugin({
    //         // terserOptions: {
    //         //     output: {
    //         //         comments: false,
    //         //     },
    //         // },
    //         minify: (file, sourceMap) => {
    //             // https://github.com/mishoo/UglifyJS2#minify-options
    //             var uglifyJsOptions = {
    //                 /* your `uglify-js` package options */
    //             };

    //             if (sourceMap) {
    //                 uglifyJsOptions.sourceMap = {
    //                     content: sourceMap,
    //                 };
    //             }

    //             return require('uglify-js').minify(file, uglifyJsOptions);
    //         },
    //     }), new OptimizeCSSAssetsPlugin({})],
    // },
    // Transform all txt file to valid module (maybe to javascript file) by raw loader
    module: {
        rules: [{
                test: /\.txt$/,
                use: 'raw-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', ]
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
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Caching'
        }),
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
        }),
    ],
    mode: "production",
    // mode: "development",
    // mode: "none",
}