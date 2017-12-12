const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const stylesLess = new ExtractTextPlugin({ filename: 'styles.css' });

module.exports = merge(common, {
    devtool: false,
    module: {
        rules: [
            {
                test: /styles\.less$/,
                use: stylesLess.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true,
                            },
                        },
                        { loader: 'less-loader' },
                    ],
                    fallback: 'style-loader',
                }),
            },
        ],
    },
    plugins: [
        new UglifyJSPlugin(),
        stylesLess,
    ],
});
