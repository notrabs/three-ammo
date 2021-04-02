const path = require("path");
const webpack = require("webpack");

module.exports = (env, argv) => ({
  node: {
    fs: "empty"
  },
  entry:
    argv.mode === "production"
      ? { threeammo: "./index.ts", "threeammo-worker": "./worker/index.js" }
      : {
          example: "./examples/example.js",
          sabexample: "./examples/sabexample.js",
          stress: "./examples/stress.js",
          sabstress: "./examples/sabstress.js",
          transferablestress: "./examples/transferablestress.js"
        },
  output: {
    globalObject: "this",
    path: argv.mode === "production" ? path.resolve(__dirname, "dist") : path.resolve(__dirname, "examples"),
    publicPath: "/examples/",
    libraryTarget: "umd",
    filename: argv.mode === "production" ? "[name].js" : "[name].js"
  },
  devtool: argv.mode === "production" ? "source-map" : "inline-source-map",
  devServer: {
    host: "0.0.0.0",
    port: "8888"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.worker\.ts$/,
        loader: "worker-loader",
        options: {
          name: "[name]-[hash].js",
          publicPath: "/",
          inline: true
        }
      },
      {
        test: /\.(wasm)$/,
        type: "javascript/auto",
        use: {
          loader: "url-loader",
          options: {
            mimetype: "application/wasm",
            limit: false
          }
        }
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  }
});
