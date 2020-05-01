const TerserJSPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const WorkboxPlugin = require('workbox-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common,
    {
        mode: "production",
        devtool: 'source-map',
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
        plugins: [
            new CompressionPlugin(),
            new MiniCssExtractPlugin({
                filename: '[name].[hash].css',
                chunkFilename: '[id].[hash].css',
            }),
            new HtmlWebpackPlugin({
                title: 'Progressive Web Application',
            }),
            new WorkboxPlugin.GenerateSW({
              // these options encourage the ServiceWorkers to get in there fast
              // and not allow any straggling "old" SWs to hang around
              clientsClaim: true,
              skipWaiting: true,
            }),
        ],
    })

