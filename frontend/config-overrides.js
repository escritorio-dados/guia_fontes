const { useBabelRc, override } = require('customize-cra');
const path = require('path');

const resolvePathCofig = config => {
  config.resolve = {
    ...config.resolve,

    alias: {
      ...config.alias,
      '#shared': path.resolve(__dirname, 'src/shared'),
      '#modules': path.resolve(__dirname, 'src/modules'),
      '#static': path.resolve(__dirname, 'src/static'),
    },
  };

  return config;
}

module.exports = override(useBabelRc(), resolvePathCofig);
