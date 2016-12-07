const polyseerio = require('../');

return polyseerio.start({
    agent: {
      subtype: polyseerio.Subtype.PERIODIC
    }
  }).
  then(client => {
    console.log('do work');
  });
