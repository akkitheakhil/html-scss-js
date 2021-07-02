const path = require('path');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Hard code this to production but can be adapted to accept args to change env.
const mode = 'production';

module.exports = {
  mode,
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: "/dist"
  },

  resolve: {
    extensions: ['.css', '.scss'],
    alias: {
      // Provides ability to include node_modules with ~
      '~': path.resolve(process.cwd(), 'src'),
    },
  },

  entry: {
    // Will create "styles.css" in "css" dir.
    "styles": './src/styles/styles.scss',
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          // Extract and save the final CSS.
          MiniCssExtractPlugin.loader,
          // Load the CSS, set url = false to prevent following urls to fonts and images.
          { loader: "css-loader", options: { url: false, importLoaders: 1 } },
          // Add browser prefixes and minify CSS.
          { loader: 'postcss-loader', options: { plugins: [autoprefixer(), cssnano()] }},
          // Load the SCSS/SASS
          { loader: 'sass-loader' },
        ],
      },
    ],
  },

  plugins: [
    // Define the filename pattern for CSS.
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),

    new CopyWebpackPlugin(
      { 
        patterns: [
          { from: 'src/index.html', to: 'index.html' },
          { from: 'src/index.js', to: 'index.js' },
        ]
      }
    )
  ]
}
