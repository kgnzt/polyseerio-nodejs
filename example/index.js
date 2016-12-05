const polyseerio = require('../'),
      config     = require('./config'),
      co         = require('co');

const { Alert,
        Channel,
        Environment,
        Event,
        Expectation,
        Instance,
        LogicBlock,
        Member,
        Settings,
        Task } = polyseerio(config.token, { env: config.env });


co(function* () {
  /*
  const data = {
    instance: 'demo',
    reason: 'because i said so'
  }

  yield onExit(data);
  */

  /**
   * Attach current intance.
   */
  /*
  const instance = yield Instance.
    attach({ name: 'test-instance' });
  */

  /**
   * Trigger a memory alert.
   */
  //yield onMemoryLimit(1000, { name: 'app-1', id: 100 });

  /**
   * Trigger an event.
   */
  /*
  const event = yield Event.create({
    name: 'an-event'
  }).catch(console.log);
  */

  /**
   * Create a task.
   */
  /*
  const task = yield Task.create({
    name: 'my-new-task'
  }).catch(console.log);
  */

  /**
   * Message an environment by primary id.
   */
  /*
  const message = yield Environment.
    findById('57c67a02f8081a0100fbe5ae').
    then(environment => {
      return Environment.message(environment.id, 'Testing');
    }).
    catch(console.log);
  */
}).catch(e => console.log(e));
