const { override, fixBabelImports, addWebpackAlias } = require('customize-cra');
const rewireReactHotLoader = require('react-app-rewire-hot-loader');
const path = require('path');

const resolve = (dir) => path.join(__dirname, '.', dir);
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  }),
  addWebpackAlias({
    '@src': resolve('src'),
    '@utils': resolve('src/utils'),
    '@assets': resolve('src/assets'),
    '@commom-part': resolve('src/comom-part'),
    '@pages': resolve('src/pages'),
    '@types': resolve('src/types'),
    '@slot-pages': resolve('src/slot-pages'),
  }),
  (config, env) => {
    config = rewireReactHotLoader(config, env);
    return config;
  },
);
