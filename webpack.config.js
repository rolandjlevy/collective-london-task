// webpack.config.js
const path = require('path');
// load module that remove previous bundled files
const CleanWebpackPlugin = require('clean-webpack-plugin');
// load module that copies build files
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  // entry point for webpack build
  entry: path.resolve(__dirname, './app/index.js'),
  devtool: 'source-map',
  // build is output to dist/bundle.js
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    // remove previous bundled files
    new CleanWebpackPlugin(['dist']),
    // copies files from source to destination
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname, 'assets'), to: path.resolve(__dirname, 'dist') },
      { from: path.resolve(__dirname, 'src/index.html'), to: path.resolve(__dirname, 'dist/index.html') }
    ])
  ],
  // create devServer for dev environment: http://localhost:9000/
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    watchContentBase: true,
    compress: true,
    port: 9000
  },

  // Define rules for bundling:
  
  // babel-loader transpiles JS code
  // style-loader adds CSS to DOM using style tags
  // css-loader interprets @import and url() like import/require()
  // sass-loader compiles SASS files to CSS
  // file-loader adds images to the build

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: require.resolve('babel-loader')
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          }, {
            loader: "css-loader"
          }, {
            loader: "sass-loader"
          }
        ]
      }, {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      }
    ]
  }
};