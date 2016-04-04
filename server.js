var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.dev');

new WebpackDevServer(webpack(config), {
    hot: true,
    historyApiFallback: true,
    // proxy: {
    //     '/zuiwan-backend/index.php/*': {
    //         target: 'https://zuiwant.com/zuiwan-backend/index.php/*',
    //         secure: false,
    //         bypass: function(req, res, proxyOptions) {
    //             console.log(res, req);
    //         }
    //     },
    // },
    // '/ajax/*': 'http://your.backend/',
    //区别？？
    publicPath: "/build/",
    contentBase: "/build/",
    stats: {
        colors: true
    },
}).listen(8080, 'localhost', function(err, result) {
    if (err) {
        console.log(err);
    }
    console.log('Listening at localhost:8080');
});