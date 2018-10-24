var path = require('path');

const MinifyPlugin = require('babel-minify-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, 'dist');
var APP_DIR = __dirname;

var config = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'index.js',
    libraryTarget: "umd",
    umdNamedDefine: true 
  },
  externals: {
    'react': 'react',
    'prop-types': 'prop-types',
    'react-onclickoutside': 'react-onclickoutside'
  },
  module : {
    rules: [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          query: {
            plugins: ["transform-class-properties","transform-object-assign"],
            presets: [ "es2015","react","stage-0"],
          }
        }
      }
    ]
  },
  mode: 'production',
  plugins: [
    new MinifyPlugin()
  ]
};

module.exports = config;
