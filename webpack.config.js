const miniCssExtractPlugin = require('mini-css-extract-plugin');
const cssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const terserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const path = require('path');

module.exports = {
  entry: './src/js/app.js',
  output: {
    filename: 'assets/bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
  module: {
    rules: [
        {
            test: /\.m?js$/,
            exclude:/node_modules/,
            use: {
                loader: 'babel-loader'
            }
        },
        {
            test: /\.s[ac]ss$/i,
            use: [
                miniCssExtractPlugin.loader,
                "css-loader",
                "sass-loader"
            ],
        },
        {
          test: /\.(gif|png|jpe?g|txt)$/,
          use: [
            {
              loader: 'file-loader',
              options:{
                name: '[name].[ext]',
                outputPath: 'assets/images/',
                loader: 'image-webpack-loader',
                options: {
                  mozjpeg: {
                    progressive: true,
                    quality: 65
                  },
                  optipng: {
                    enabled: true
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
    new CleanWebpackPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [
        new cssMinimizerPlugin(),
        new terserPlugin(),
    ]
  }
};