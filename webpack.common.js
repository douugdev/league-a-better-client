const path = require('path');
const Dotenv = require('dotenv-webpack');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  plugins: [
    new Dotenv(),
    new CopyPlugin({
      patterns: [
        {
          from: 'src/**/*.{jpg,png,gif,jpeg,webm,flac,mp3,mp4}',
          to: path.join(__dirname, 'assets/img/[name][ext]'),
        },
      ],
      options: {
        concurrency: 100,
      },
    }),
  ],
  // webpack will take the files from ./src/index
  entry: './src/index.tsx',
  // and output it into /dist as bundle.js
  output: {
    path: path.join(__dirname, '/plugins'),
    filename: 'abc.js',
  },
  // adding .ts and .tsx to resolve.extensions will help babel look for .ts and .tsx files to transpile
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      // we use babel-loader to load our jsx and tsx files
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      // css-loader to bundle all the css files into one file and style-loader to add all the styles  inside the style tag of the document
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              insert: function (element) {
                document.addEventListener('DOMContentLoaded', () =>
                  document.head.appendChild(element)
                );
              },
            },
          },
          'css-loader',
        ],
      },
      {
        test: /\.s(a|c)ss$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              insert: function (element) {
                document.addEventListener('DOMContentLoaded', () =>
                  document.head.appendChild(element)
                );
              },
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },

      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        exclude: /node_modules/,
        include: [path.join(__dirname, './src/assets')],
        type: 'asset/resource',
        generator: {
          outputPath: '../assets',
          publicPath: '../assets',
        },
        sideEffects: true,
      },
    ],
  },
};
