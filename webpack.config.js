const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OfflinePlugin = require('offline-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

module.exports = env => {
    console.log('NODE_ENV: ', env.NODE_ENV) // true
    if (env.NODE_ENV === 'production') {
        console.log("!!!RELEASE!!!");
    }
    else {
        console.log("debug");
    }

    var plugins = [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['**/*', '!.nojekyll']
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
            chunkFilename: "[id].[contenthash].css"
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new WebpackPwaManifest({
            name: "ROMEL|Rune BFS",
            short_name: "ROMEL|Rune BFS",
            theme_color: "#FAFAFA",
            background_color: '#FAFAFA',
            icons: [{
                src: path.resolve('./src/img/Rune_On_1.png'),
                sizes: [96, 128, 192, 256, 384, 512, 1024] // multiple sizes
            }]
        }),
        new OfflinePlugin({
            appShell: '/RuneBFS/',
            autoUpdate: true,
            ServiceWorker: {
                cacheName: "ROMEL_RuneBFS",
                events: true,
            },
            AppCache: false,
        })
    ];

    return {
        mode: env.NODE_ENV || 'production',
        entry: {
            data: './src/js/data.js',
            main: './src/index.js'
        },
        output: {
            filename: '[name].[chunkhash].js',
            chunkFilename: '[name].[chunkhash].js',
            path: path.resolve(__dirname, 'docs')
        },
        optimization: {
            splitChunks: {
                // include all types of chunks
                //chunks: 'all'
            }
        },
        module: {
            rules: [{
                    test: /\.css$/,
                    use: [{
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                // you can specify a publicPath here
                                // by default it use publicPath in webpackOptions.output
                                //publicPath: '../'
                            }
                        },
                        "css-loader"
                    ]
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 16384
                        }
                    }]
                },
                // {
                //   test: /\.(tpl|html)$/,
                //   include: [
                //     path.resolve(__dirname, "src/template")
                //   ],
                //   use: [
                //     {
                //       loader: 'underscore-template-loader',
                //       options: {
                //         globalLodash: true,
                //       }
                //     }
                //   ]
                // }
            ]
        },
        plugins: plugins
    };
};