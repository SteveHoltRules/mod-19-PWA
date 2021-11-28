const webpack = require("webpack");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");

const config = {
  entry: {
    main: "./public/js/index.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: `${__dirname}/dist`,
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              esModule: false,
              name(file) {
                return "[path][name].[ext]";
              },
              publicPath(url) {
                return url.replace("../", "/assets/");
              },
            },
          },
          {
            loader: "image-webpack-loader",
          },
        ],
      },
    ],
  },
  // 19.2.5 section
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
    }),
    new WebpackPwaManifest({
      name: "Budget App",
      short_name: "Budget",
      description: "An App for Budgeting",
      background_color: "#01579b",
      theme_color: "#ffffff",
      icons: [
        {
          src: path.resolve("public/icons/icon-512x512.png"),
          sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
          destination: path.join("public", "icons"),
        },
      ],
    }),
  ],
  mode: "development",
};

module.exports = config;
