const polyseerio = require('../'),
      config     = require('./poly.json'),
      co         = require('co');

const client = polyseerio(config);

return client.startAgent().
  then(_ => {
    console.log('Agent has started.');

    return client.Event.create({
      name: 'User signed up.',
      color: 'green',
      icon: 'check'
    });
  }).catch(console.log);
