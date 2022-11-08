const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const port = 5000;

module.exports = {
  entry: [
    __dirname + '/src/script/script.ts',
    __dirname + '/src/style/style.scss'
  ],
  devtool: 'inline-source-map',
  mode: 'development',
  devServer: {
    static: __dirname + '/public',
    compress: true,
    port,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader"
          },
        ],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({
    title: 'jsGames',
    filename: 'index.html'
  })],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'script.min.js',
    path: path.resolve(__dirname, './public'),
    clean: true,
    publicPath: '/',
  },
};