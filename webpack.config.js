const precss = require('precss');
const webpack = require('webpack');
const { resolve } = require('path');
const webpackMerge = require('webpack-merge');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const TARGET = process.env.npm_lifecycle_event;

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || "8080";

const commonConfig = {
  context: resolve(__dirname, './src'),
    entry: [
		'react-hot-loader/patch',
		'./index', 
	  ],
    
    output: {
        path: resolve(__dirname, './dist'),
        filename: 'bundle.js'
    }, 
    resolve: {
		  extensions: ['.js', '.jsx']
	  }, 
    
    devtool: 'cheap-eval-source-map',
    
    devServer: {
        contentBase: resolve(__dirname, './dist'), 
        
        historyApiFallback: true,

        hot: true,

        noInfo: true,

        inline: true,

        port: PORT,
		    
        host: HOST
    }, 

   module: {
    rules: [
      
       { test: /\.jsx?$/,
         exclude: /node_modules/,
         loader: 'babel-loader'
       }, 
        {
          test: /\.(sass|scss)$/, 
           use: [
           'style-loader',
           'css-loader',
           'postcss-loader',
           'sass-loader'
        ]
        },
        {
         test: /\.(gif|png|jpe?g|svg)$/i,
        loaders: [
         'file-loader', 'image-webpack-loader']
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
          title: 'My app',
          template: './index.html'
        }),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery'
    })
  ]
};

if(TARGET === 'build') {
  
  module.exports = webpackMerge(commonConfig, {  
    plugins: [
      new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
      }),
      new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                },
                comments: false,
                sourceMap: false
            })
    ],
    devtool: 'source-map'
  });
}

if(TARGET === 'start') {
  module.exports = webpackMerge(commonConfig, {
    plugins: [
     new webpack.HotModuleReplacementPlugin()
    ],
     devtool: 'cheap-eval-source-map'
  });
}


