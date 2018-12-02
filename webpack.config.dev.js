import webpack from 'webpack'
import path from 'path'

export default {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map', // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps and https://webpack.github.io/docs/configuration.html#devtool
  entry: [
    './src/index'
  ],
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'), // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './src'
  },
  module: {
    rules: [
      {test: /\.js$/, include: path.join(__dirname, 'src'), loader: 'babel-loader'},
      {
        test: /\.less$/,
        use: [
        {
          loader: 'style-loader' // creates style nodes from JS strings
        },
        {
          loader: 'css-loader' // translates CSS into CommonJS
        },
        {
          loader: 'less-loader' // compiles Less to CSS
        }]
        },
        {
            test: /(\.css)$/,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {sourcemap: true}
              }
            ]
          },
        {
            test: /\.(png|jpg|gif)$/,
            use: [
                {
                    loader: 'file-loader',
                    options:
                        {
                            output: 'static/'
                        }
                }
            ]

        },
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader'},
      {test: /\.(woff|woff2)$/, options: {prefix: 'font/', limit: 5000}, loader: 'url-loader'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, options: {limit: 10000, mimetype: 'application/octet-stream'}, loader: 'url-loader'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, options: {limit: 10000, mimetype: 'image/svg+xml' }, loader: 'url-loader'},

    ]
  }
}


