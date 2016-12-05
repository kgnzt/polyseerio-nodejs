const polyseerio = require('../'),
      config     = require('./config'),
      co         = require('co');

const client = polyseerio({ token: config.token });

co(function* () {
  return client.agent.start();
}).catch(e => console.log(e));
