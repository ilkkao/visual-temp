const path = require('path');
const webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const prefix = path.resolve(__dirname);
const nodeEnv = process.env.NODE_ENV;

const isProduction = nodeEnv === 'production';

console.log(`Production mode: ${isProduction}`); // eslint-disable-line no-console

const config = {
    entry: `${prefix}/js/app.js`,
    output: {
        path: `${prefix}/dist`,
        publicPath: '/assets/',
        filename: isProduction ? 'app-[hash].js' : 'app.js'
    },
    module: {
        rules: [ {
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: 'babel-loader'
        }, {
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader?modules' ]
        }, {
            test: /\.(ttf|eot|svg|woff|woff2)$/,
            use: 'url-loader?limit=10000'
        } ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(nodeEnv)
            }
        }),
        new ManifestPlugin()
    ]
};

if (!isProduction) {
    config.plugins.push(new DashboardPlugin());
}

module.exports = config;
