'use strict'
let allBgimg=`
$logo_Img:url("../../../static/img/headerlogo.png");//登录logo
$down:url("../../static/img/down.png");//更新图片
//登录最小,关闭按钮
$narrow_white:url("../../../../static/img/narrow_white.svg");
$Close_white:url("../../../../static/img/Close_white.svg");
$member_Img:url("../../../../../static/img/infor/memberimg.png");
//导航图片
$personal:url("../../../static/img/personal.svg");
$personal_hover:url("../../../static/img/personal_hover.svg");
$home:url("../../../static/img/home.svg");
$home_hover:url("../../../static/img/home_hover.svg");
$xhjy:url("../../../static/img/xhjy.svg");
$xhjy_hover:url("../../../static/img/xhjy_hover.svg");
$zdjy:url("../../../static/img/zdjy.svg");
$zdjy_hover:url("../../../static/img/zdjy_hover.svg");
$GJHQ:url("../../../static/img/GJHQ.svg");
$gjhq_hover:url("../../../static/img/gjhq_hover.svg");
$sqbd:url("../../../static/img/sqbd.svg");
$sqbd_hover:url("../../../static/img/sqbd_hover.svg");
$zhsz:url("../../../static/img/zhsz.svg");
$zhsz_hover:url("../../../static/img/zhsz_hover.svg");
$GD:url("../../../static/img/GD.svg");
$gd_hover:url("../../../static/img/gd_hover.svg");
//内容窗口最小化大话按钮
$setClr-btn:url("../../../static/img/shezhi_white.svg");
$min-btn:url("../../../static/img/sx_white.svg");
$max-btn:url("../../../static/img/sf_white-01.svg");
$back-btn:url("../../../static/img/sx2_white.svg");
$close-btn:url("../../../static/img/gb_white.svg");
`;
process.env.BABEL_ENV = 'renderer'

const path = require('path')
const { dependencies } = require('../package.json')
const webpack = require('webpack')

const BabiliWebpackPlugin = require('babili-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

/**
 * List of node_modules to include in webpack bundle
 *
 * Required for specific packages like Vue UI libraries
 * that provide pure *.vue files that need compiling
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/webpack-configurations.html#white-listing-externals
 */
let whiteListedModules = ['vue','element-ui']

let rendererConfig = {
  devtool: '#cheap-module-eval-source-map',
  entry: {
    renderer: path.join(__dirname, '../src/renderer/main.js')
  },
  externals: [
    ...Object.keys(dependencies || {}).filter(d => !whiteListedModules.includes(d))
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['vue-style-loader', 'css-loader',
            {
                loader: 'sass-loader',
                options: {
                    data: allBgimg
                }
            }
        ]
      },
      {
        test: /\.sass$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader?indentedSyntax']
      },
      {
        test: /\.less$/,
        use: ['vue-style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.html$/,
        use: 'vue-html-loader'
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.node$/,
        use: 'node-loader'
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            extractCSS: process.env.NODE_ENV === 'production',
            loaders: {
               sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax=1',
                scss: 'vue-style-loader!css-loader!sass-loader',
              less: 'vue-style-loader!css-loader!less-loader'
            }
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          query: {
            limit: 10000,
            name: 'imgs/[name]--[folder].[ext]'
          }
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'media/[name]--[folder].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          query: {
            limit: 10000,
            name: 'fonts/[name]--[folder].[ext]'
          }
        }
      }
    ]
  },
  node: {
    __dirname: process.env.NODE_ENV !== 'production',
    __filename: process.env.NODE_ENV !== 'production'
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({filename: 'styles.css'}),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/index.ejs'),
      minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true
      },
      nodeModules: process.env.NODE_ENV !== 'production'
        ? path.resolve(__dirname, '../node_modules')
        : false
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '../dist/electron')
  },
  resolve: {
    alias: {
        '@': path.join(__dirname, '../src/renderer'),
        '~':path.join(__dirname, '../src/renderer/components/page'),
        '&':path.join(__dirname, '../src/renderer/components/module'),
        '^':path.join(__dirname, '../static/img'),
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['.js', '.vue', '.json', '.css', '.node']
  },
  target: 'electron-renderer'
}

/**
 * Adjust rendererConfig for development settings
 */
if (process.env.NODE_ENV !== 'production') {
  rendererConfig.plugins.push(
    new webpack.DefinePlugin({
      '__static': `"${path.join(__dirname, '../static').replace(/\\/g, '\\\\')}"`
    })
  )
}

/**
 * Adjust rendererConfig for production settings
 */
if (process.env.NODE_ENV === 'production') {
  rendererConfig.devtool = ''

  rendererConfig.plugins.push(
    new BabiliWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, '../static'),
        to: path.join(__dirname, '../dist/electron/static'),
        ignore: ['.*']
      }
    ]),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  )
}

module.exports = rendererConfig
