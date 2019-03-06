'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  mongoose: {
    enable: true,
    package: 'egg-mongoose'
  },
  ejs: {
    enable: true,
    package: 'egg-view-ejs',
  }
};

