'use strict';

if (!('ROOT_KEY' in process.env)) {
  throw new Error(`Validation tests require a ROOT_KEY environment variable be defined.`);
}

module.exports = {
  ROOT_KEY: process.env.ROOT_KEY,
  DEFAULT_TIMEOUT: 10000 // 10 seconds
};
