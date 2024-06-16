//Webpack Configuration Imports
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');


module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js"
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      //Generate HTML File and Inject Bundles
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "Text Editor"
      }),

      //Custom Service Worker
      new InjectManifest ({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js"
      }),

      //Manifest PWA Configuration .JSON File
      new WebpackPwaManifest ({
        fingerprints: false,
        inject: true,
        display: "standalone",
        name: "JATE",
        short_name: "JATE",
        description: "Not Just Another Progressive Web Application Text Editor!",
        background_color: "#225ca3",
        theme_color: "#225ca3",
        start_url: "/",
        publicPath: "/",
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons")
          }
        ]
      })
    ],

    module: {
      rules: [
        //CSS Loader to Load CSS Files and Style Loader to Inject CSS into DOM
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"]
        },
        //Babel-Loader to Use ES6
        {
          test: /\.m?js$/,
          exclude: /node_mondules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime",
              ]
            }
          }
        }
      ],
    },
  };
};