const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
    module: {
      rules: [
        {
            test: /\.(js|jsx)$/i,
            exclude: /node_modules/,
            use: ["babel-loader"]
        },
        {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"]

        },
        {
          test: /\.(png|svg|jpg|gif|pdf)$/,
          use: ["file-loader"],
        },
      ]
    },
    resolve: {
        extensions: ['html', '.js', '.jsx'],
        alias: {
            algorithms: path.resolve(__dirname, 'src/algorithms/'),
            constants: path.resolve(__dirname, 'src/constants/'),
            assets: path.resolve(__dirname, 'src/assets/')
        }
    },
    plugins: [
        new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "./index.html",
        favicon: "./src/favicon.ico"
      })
    ]
  };