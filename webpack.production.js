var webpack = require('webpack');
var path = require('path');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

module.exports = {
    entry: [
        path.resolve(__dirname, 'src/main.js')
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: "./build/",
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['react-hot', 'babel'],
            include: path.join(__dirname, 'src')
        }, {
            test: /\.(css|less)$/,
            loader: 'style!css!autoprefixer!less'
        }, {
            test: /\.(ttf|eot|svg|woff?)(\?[a-z0-9]+)?$/,
            loader: 'file-loader'
        }, {
            test: /\.(png|jpg)$/,
            loader: 'file-loader'
        }]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ]
};
new webpack.DefinePlugin({
    "process.env": {
        NODE_ENV: JSON.stringify("production")
    }
});