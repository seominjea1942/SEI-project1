const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  devServer: {
    contentBase: './docs',
    hot:true
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'docs'),
  },
  plugins:[new webpack.HotModuleReplacementPlugin()],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      }
    ],
  },
};