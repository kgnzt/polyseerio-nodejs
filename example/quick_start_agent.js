const polyseerio = require('../');

/**
 * The fastest way to integrate Polyseer.io.
 */
return polyseerio.start().
  then(client => {
    console.log('ok');
  });
