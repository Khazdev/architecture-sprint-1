const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {ModuleFederationPlugin} = require("@module-federation/enhanced");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*', // Allow all origins or specify your main app's URL
      'Access-Control-Allow-Credentials': 'true',
    },
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: "/node_modules/",
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", {loader: "css-loader", options: {url: true}}],
      },
      {
        test: /\.(png|jpe?g|gif|eot|woff2|woff|ttf|svg)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new ModuleFederationPlugin({
      name: "mesto_main",
      filename: "remoteEntry.js",
      remotes: {
        mesto_auth: "mesto_auth@http://localhost:9001/remoteEntry.js",
        mesto_cards: "mesto_cards@http://localhost:9002/remoteEntry.js",
        mesto_profile: "mesto_profile@http://localhost:9003/remoteEntry.js",
      },
      shared: {
        react: {
          singleton: true,
        },
        "react-dom": {
          singleton: true,
        },
        "react-router-dom": {
          singleton: true,
        },
        'shared-library': {
          singleton: true,
          eager: true
        }
      },
    }),
  ],
};
