const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // Import the plugin
const partytown = require("@builder.io/partytown/utils");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    main: "./js/main.js",
  },

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin(), new HtmlMinimizerPlugin()],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        // { from: "index.html", to: "index.html" },
        { from: "manifest.json", to: "manifest.json" },
        { from: "call-worker.js", to: "call-worker.js" },
        { from: "offline-uzitrake.js", to: "offline-uzitrake.js" },
        { from: "offline.html", to: "offline.html" },
        { from: "backup.html", to: "backup.html" },
        { from: "css", to: "css" },
        { from: "fonts", to: "fonts" },
        { from: "videos", to: "videos" },
        { from: "img", to: "img" },
        { from: "js", to: "js" },
        { from: "libs-js", to: "libs-js" },
        { from: "works", to: "works" },
        {
          from: partytown.libDirPath(),
          to: path.join(__dirname, "public", "~partytown"),
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "index.html",
      inject: "body",
      chunks: ["main"],
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
      },
    }),
    new CleanWebpackPlugin(),
  ],

  devtool: false,
};
