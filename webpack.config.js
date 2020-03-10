const path = require('path');
const TerserJSPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: './src/index.js', // this one is default
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js', // default one
        publicPath: 'http://localhost:8080/',
    },
    optimization: {
        minimizer: [new TerserJSPlugin({
            // terserOptions: {
            //     output: {
            //         comments: false,
            //     },
            // },
            minify: (file, sourceMap) => {
                // https://github.com/mishoo/UglifyJS2#minify-options
                var uglifyJsOptions = {
                    /* your `uglify-js` package options */
                };

                if (sourceMap) {
                    uglifyJsOptions.sourceMap = {
                        content: sourceMap,
                    };
                }

                return require('uglify-js').minify(file, uglifyJsOptions);
            },
        }), new OptimizeCSSAssetsPlugin({})],
    },
    // Transform all txt file to valid module (maybe to javascript file) by raw loader
    module: {
        rules: [
            { test: /\.txt$/, use: 'raw-loader' },
            { test: /\.css$/, use: ['style-loader', 'css-loader',] },
            {
                test: /\.(png|svg|jpg|gif)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'assets/images',
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './src/index.html' }),
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
        }),
    ],
    mode: "production",
    // mode: "none",
}