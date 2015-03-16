module.exports = {
  entry: "./wv.js",
  output: {
        path: __dirname + "/bin/",
        filename: "packed.js"
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css"}
    ]
  }
}
