const HtmlWebpackPlugin = require('html-webpack-plugin');
const {ModuleFederationPlugin} = require('@module-federation/enhanced');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devServer: {
    port: 9001,
    headers: {
      'Access-Control-Allow-Origin': '*', // Allow all origins or specify your main app's URL
      'Access-Control-Allow-Credentials': 'true',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new ModuleFederationPlugin({
      name: 'mesto_auth',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/components/App',
        './Login': './src/components/Login.js',
        './Register': './src/components/Register.js',
        './InfoTooltip': './src/components/InfoTooltip.js',
        './hooks': './src/utils/hooks.js',
      },
      shared: {
        react: {
          singleton: true
        },
        'react-dom': {
          singleton: true
        },
        'react-router-dom': {
          singleton: true
        },
        'shared-library': {
          singleton: true,
          eager: true
        }
      }
    }),
  ],
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
        use: ["style-loader", "css-loader"],
      }
    ],
  }

};
