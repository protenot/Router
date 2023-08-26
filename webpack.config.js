const path = require("path");
//import * as webpack from "webpack";
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { NODE_ENV } = process.env;
//const PREFIX = NODE_ENV === "production" ? "/Router" : "/";
const PREFIX = "/Router";
module.exports = {
  mode: "development",

  entry: {
    main: path.resolve(__dirname, "./src/index.ts"),
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: NODE_ENV === "production" ? PREFIX : "/",
    clean: true,
    environment: {
      arrowFunction: false,
    },
  },
  //devtool: NODE_ENV === "production" ? "hidden-source-map" : "eval-source-map",
  resolve: {
    extensions: [".js", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/,
        use: "html-loader",
      },
      {
        test: /\.(?:js|mjs|cjs|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(?:ico|gif|png|jpeg|jpg|svg)$/i,
        type: "asset/resource",
        generator: {
          filename: "img/[name]-[hash:5][ext]",
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html"),
      filename: "index.html",
    }),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html"),
      filename: "404.html",
    }),
    /* new webpack.DefinePlugin({
      PRODUCTION: NODE_ENV == "production",
      PREFIX: JSON.stringify(PREFIX),
    }), */
  ],

  devServer: {
    client: {
      logging: "info",
    },
    compress: false,
    open: true,
    port: 3000,
    hot: true,
    historyApiFallback: true,
  },
};
