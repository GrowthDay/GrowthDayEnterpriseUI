const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin')

// const webpack = require('webpack')
// const CracoEsbuildPlugin = require('craco-esbuild')

module.exports = {
  // plugins: [{ plugin: CracoEsbuildPlugin }],
  webpack: {
    plugins: [
      // new webpack.ProvidePlugin({
      //   React: 'react'
      // }),
      new SimpleProgressWebpackPlugin()
    ]
  },
  babel: {
    plugins: [
      [
        'babel-plugin-direct-import',
        {
          modules: ['@mui/system', '@mui/material', '@mui/lab', '@mui/icons-material', 'lodash', 'lodash-es']
        }
      ]
    ]
  }
}
