//https://krzysztofzuraw.com/blog/2020/setting-up-chrome-extension-dev/ <-- This helped me a lot

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    popup: "./src/popup/index.tsx",
    background: "./src/background/index.ts",
    translator: "./src/scripts/translator.tsx",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({ template: "src/popup/index.html" }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "./src/manifest.json" },
        { from: "./src/static/icons/icon16.png" },
        { from: "./src/static/icons/icon48.png" },
        { from: "./src/static/icons/icon128.png" },
      ],
    }),
  ],
  output: { filename: "[name].js", path: path.resolve(__dirname, "dist") }, // chrome will look for files under dist/* folder
};
