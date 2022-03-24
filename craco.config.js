const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin')

module.exports = {
  webpack: {
    plugins: [new SimpleProgressWebpackPlugin()]
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
