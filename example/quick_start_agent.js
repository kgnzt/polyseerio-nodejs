const polyseerio = require('../');

/**
 * The fastest way to integrate Polyseer.io.
 *
 * Requires a POLYSEERIO_TOKEN variable in the environment.
 * Defaults environment to production or what was found in NODE_ENV.
 */
return polyseerio.start().
  then(client => { 
    const { instance } = client.agent;
  });
