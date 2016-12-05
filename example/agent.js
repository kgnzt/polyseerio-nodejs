const polyseerio = require('../'),
      config     = require('./config'),
      co         = require('co');

const client = polyseerio(config.token);

return client.startAgent().
  then(_ => {
    console.log('configured');
    console.log(_);
  }).catch(console.log);
