const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// ディレクトリ設定
const sourceDir = path.join(__dirname, "../src");
const publicDir = path.join(__dirname, "../dist");

// プラグイン設定
const htmlWebpackPluginOptions = {
  template: path.join(sourceDir, "index.html.ejs"),
  inject: "body",
  hash: true,
};

module.exports = {
  entry: "./src/main.ts",
  output: {
    path: publicDir,
    filename: "app.bundle.js",
  },
  module: {
    rules: [
      // for .ts files
      {
        test: /\.ts$/,
        use: "ts-loader",
      },
    ],
  },
  resolve: {
    modules: [path.resolve(sourceDir), "node_modules"],
    extensions: [".ts", ".js"],
  },
  optimization: {
    splitChunks: {
      name: "vendor",
      chunks: "initial",
    },
  },
  plugins: [new HtmlWebpackPlugin(htmlWebpackPluginOptions)],
  devtool: "inline-source-map",
  devServer: {
    host: "0.0.0.0",
    port: 8080,
    contentBase: [publicDir],
    open: true,
  },
};
