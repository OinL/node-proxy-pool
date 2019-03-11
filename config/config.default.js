/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1551748686936_2969';

  // add your middleware config here
  config.middleware = [];

  config.mongoose = {
    clients: {
      back: {
        url: process.env.EGG_MONGODB_URL || 'mongodb://127.0.0.1:27017/proxypool',
        options: {},
      },
    },
  };

  config.view = {
    mapping: { '.html': 'ejs' } //左边写成.html后缀，会自动渲染.html文件
  };

  config.cluster = {
    listen: {
      port: 6677,
      hostname: '0.0.0.0',
      // path: '/var/run/egg.sock',
    }
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
