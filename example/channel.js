const polyseerio = require('../'),
      co         = require('co'),
      client     = polyseerio();

return co(function* () {
  yield client.getCurrentEnvironment().message('Hello deduced environment.');

  const testing = yield client.Environment.find_by_name('testing');

  testing.message('Hello testing environment.');
}).
catch(console.log);
