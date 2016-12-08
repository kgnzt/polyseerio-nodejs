const polyseerio = require('../');

/**
 * The fastest way to integrate Polyseer.io.
 *
 * Requires POLYSEERIO_TOKEN in environment.
 * Defaults environment to production or what was found in NODE_ENV.
 */
return polyseerio.start().
  then(client => { 
    const { instance } = client.agent;
  });
