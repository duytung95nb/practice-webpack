const path = require('path');
const TerserJSPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
// const Uglify = require("uglifyjs-webpack-plugin");
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = env => {
    // Use env.<YOUR VARIABLE> here:
    console.log('NODE_ENV: ', env.NODE_ENV); // 'local'
    console.log('Production: ', env.production); // true
    return {
        entry: [
            path.resolve(__dirname, "src/index.js"), // this one is default
        ],
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].[contenthash].js',
            publicPath: '/',
        },
        devtool: 'inline-source-map',
        devServer: {
            contentBase: './dist',
        },
        optimization: {
            runtimeChunk: 'single',
            moduleIds: 'hashed',
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                    },
                },
            },
            minimize: true,
            minimizer: [new TerserJSPlugin({
                terserOptions: {
                    keep_classnames: false,
                    mangle: true,
                    compress: false,
                    keep_fnames: false,
                    parse: {
                        ecma: 8
                    },
                    output: {
                        comments: false,
                        beautify: false,
                    }
                },
                minify: (file, sourceMap) => {
                    const extractedComments = [];

                    // Custom logic for extract comments

                    const { error, map, code, warnings } = require('uglify-js') // Or require('./path/to/uglify-module')
                        .minify(file, {
                            /* Your options for minification */
                        });

                    return { error, map, code, warnings, extractedComments };
                },
            }),
            ],
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
            new CompressionPlugin(),
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
}