'use strict';

const { getResourcePath,
        reduceOptions,
        resolveEid } = require('./helper');

function middleware (resource, options, args) {
  args = Array.prototype.slice.call(args);
  let opts = {};
  if (args.length > 0) {
    opts = reduceOptions(args[args.length - 1], options);
  }

  const eid = resolveEid(opts),
        uri = getResourcePath(resource, { eid });

  args[args.length - 1] = Object.assign({}, {
    eid,
    uri
  }, options);

  return global.Promise.resolve(args);
}

module.exports = middleware;
