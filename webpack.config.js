const CopyPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const path = require('path');
const pixiModule = path.join(__dirname, '/node_modules/pixi.js/')

module.exports = {
    mode: 'development',
    entry: {
        app: './src/index.ts'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        writeToDisk: true,
        liveReload: true,
        hot: false

    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader" },
            { test: /\.json$/, include: path.join(__dirname, 'node_modules', 'pixi.js'), loader: 'json-loader' },
            { test: pixiModule, loader: 'expose-loader?pixi' }
        ],
    },
    resolve: {
        alias: {
            'PIXI': pixiModule,
        },
        extensions: ['.tsx', '.ts', '.js', '.json'],
    },
    output: {
        filename: "[name]-bundle.js",
        path: path.resolve(__dirname, 'dist'),
    },

    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                {from: path.resolve(__dirname, 'public')}
            ]
        })
    ]
}
