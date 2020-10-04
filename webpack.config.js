const path = require("path");
const babiliPlugin = require("babili-webpack-plugin");
const extractTextPlugin = require("extract-text-webpack-plugin");
const opmiteCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

let plugins = [];

plugins.push(new extractTextPlugin("styles.css"));

if (process.env.NODE_ENV == "production") {
  plugins.push(new babiliPlugin());
  plugins.push(
    new opmiteCSSAssetsPlugin({
      cssProcessor: require("cssnano"),
      cssProcessorOptions: {
        discardComments: {
          removeAll: true,
        },
      },
      canPrint: true,
    })
  );
}

module.exports = {
  entry: "./app-src/app.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "dist",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: extractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader",
        }),
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: "url-loader?limit=100000",
      },
      {
        test: /\.png$/,
        use: "url-loader?limit=100000",
      },
      {
        test: /\.jpg$/,
        use: "file-loader",
      },
      {
        test: /\.(woff|woff2) (\?v=\d+\.\d+\.\d+)?$/,
        use: "url-loader?limit=10000&mimetype=application/font-woff",
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: "url-loader?limit=10000&mimetype=application/octet-stream",
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: "file-loader",
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: "url-loader?limit=10000&mimetype=image/svg+xml",
      },
    ],
  },
  plugins,
};
