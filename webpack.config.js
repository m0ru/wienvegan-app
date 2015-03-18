module.exports = {
  entry: "./scripts/wv.js",
  output: {
        path: __dirname + "/bin/",
        filename: "packed.js"
  },
  resolve: {
    riot: require.resolve('./node_modules/riot/riot.js')
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css"},
      { test: /\.(tag)$/, loader: "tag" }
    ]
  },
  node: {
    global: true
  }
}
