const polyseerio = require('../'),
      co         = require('co'),
      client     = polyseerio();

return co(function* () {
  yield client.getCurrentEnvironment().message('Hello deduced environment.');

  const testing = yield client.Environment.findByName('testing');

  testing.message('Hello testing environment.');
}).
catch(console.log);
