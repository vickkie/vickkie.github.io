const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const partytown = require("@builder.io/partytown/utils");

module.exports = {
  // mode: "development", //mode to development
  mode: "production",
  entry: "./main.js", // main.js as the entry point
  output: {
    filename: "bundle.js", // Output file name
    path: path.resolve(__dirname, "dist"), // Output directory
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "index.html", to: "index.html" },
        { from: "manifest.json", to: "manifest.json" },
        { from: "call-worker.js", to: "call-worker.js" },
        { from: "offline-uzitrake.js", to: "offline-uzitrake.js" },
        { from: "offline.html", to: "offline.html" },
        { from: "backup.html", to: "backup.html" },
        { from: "css", to: "css" },
        { from: "fonts", to: "fonts" },
        { from: "img", to: "img" },
        { from: "js", to: "js" },
        { from: "libs-js", to: "libs-js" },
        { from: "works", to: "works" },
        {
          from: partytown.libDirPath(),
          to: path.join(__dirname, "dist", "~partytown"),
        },
      ],
    }),
  ],
  devtool: false,
};
