const miniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');

module.exports = {
  entry: './src/js/app.js',
  output: {
    filename: 'assets/bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
  devtool: 'eval',
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          miniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ],
      },
      {
        test: /\.(gif|png|jpe?g)$/,
        use: [
          {
            loader: 'file-loader',
            options:{
              name: '[path][name].[ext]',
              loader: 'image-webpack-loader',
              options: {
                mozjpeg: {
                  progressive: true,
                  quality: 65
                },
                pngquant: {
                  quality: '65-90',
                  speed: 4
                },
                gifsicle: {
                  interlaced: false
                },
                webp: {
                  quality: 75
                }
              }
            }
          }
        ],
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.gif', '.png', '.jpg', '.jpeg', '.svg']
  },
  plugins:[
    new HtmlWebpackPlugin({
      inject: true,
      template: './index.html',
      filename: './index.html'
    }),
    new miniCssExtractPlugin({
      filename: 'assets/bundle.css'
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    historyApiFallback: true,
    port: 3006,
  },
};