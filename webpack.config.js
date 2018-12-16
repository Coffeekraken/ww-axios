module.exports = {
    watch: true,
    entry: {
        './dist/worker.js': './src/worker.js',
        './dist/index.js': './src/index.js',
        './public/dist/app.js': './public/src/app.js'
    },
    output: {
        filename: '[name]',
        path: __dirname
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