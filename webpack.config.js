module.exports = {
    watch: true,
    entry: {
        './public/dist/app.js': './public/src/app.js',
        './dist/index.js': './src/index.js'
    },
    output: {
        filename: '[name]',
        path: __dirname,
        library: 'coffeekraken-ww-axios',
        libraryTarget: 'umd'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /worker\.js$/,
          use: {
            loader: 'worker-loader',
            options: {
              inline: true,
              fallback: false
            }
          },
        }
      ]
    }
  };