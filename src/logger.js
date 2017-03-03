'use strict';

const winston = require('winston'),
      lodash  = require('lodash');

/**
 * SDK logger.
 */
const logger = new winston.Logger({
  level: process.env.POLYSEERIO_LOG_LEVEL || 'error',
  transports: [
    new winston.transports.Console()
  ]
});

/**
 * Log an error.
 *
 * @param {winston}
 * @param {Error}
 */
function _logErrorWithLogger (logger, error) {
  const meta = { stack: error.stack };

  logger.log('error', `${error.name}: ${error.message}`, meta);
}
const logErrorWithLogger = lodash.curry(_logErrorWithLogger);

/**
 * Log an error and continue to reject.
 *
 * @param {winston}
 * @param {Error}
 */
function _logAndRejectWithLogger (logger, error) {
  logErrorWithLogger(logger, error);

  return global.Promise.reject(error);
}
const logAndRejectWithLogger = lodash.curry(_logAndRejectWithLogger);

/**
 * Create helper methods.
 */
const logError = logErrorWithLogger(logger);
const logAndReject = logAndRejectWithLogger(logger);

// A little bit dangerous. Maybe there is a way to be nicer.
Object.assign(logger, {
  logError,
  logAndReject
});

module.exports = logger;
