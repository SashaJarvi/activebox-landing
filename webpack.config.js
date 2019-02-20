const path = require('path'),
    MiniCssExtractPlugin = require("mini-css-extract-plugin"),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    autoprefixer = require('autoprefixer'),
    mqpacker = require('css-mqpacker'),
    sortCSSmq = require('sort-css-media-queries'),
    webpack = require('webpack');

module.exports = {
    entry: { main: './src/index.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'script.js'
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif|ico|svg)$/,
                loader: 'file-loader',
                options: {
                    name: 'img/[name].[ext]',
                    context: ''
                }
            },
            {
                test: /\.(woff(2)?|ttf|eot)?$/,
                loader: 'url-loader?limit=100000'
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: ['img:src']
                    }
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                autoprefixer({
                                    grid: true,
                                    browsers: ['>1%']
                                }),
                                mqpacker({
                                    sort: sortCSSmq
                                })
                            ],
                        }
                    },
                    'less-loader'
                ]
            },
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            'jQuery': 'jquery',
            'window.jQuery': 'jquery',
            'jquery': 'jquery',
            'window.jquery': 'jquery',
            '$': 'jquery',
            'window.$' : 'jquery',
        }),
        new CleanWebpackPlugin('dist', {} ),
        new MiniCssExtractPlugin(
            {filename: 'style.css'}
        ),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/index.html',
            filename: 'index.html'
        })
    ]
};