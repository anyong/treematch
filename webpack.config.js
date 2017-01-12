module.exports = {
    entry: './scripts/app.jsx',
    output: {
        filename: 'bundle.js',
        path: './dist',
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'react'],
            },
        }],
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
    devtool: 'source-map',
};
