'use strict';

const should = require('should'),
      co = require('co'),
      { DEFAULT_TIMEOUT } = require('./config'),
      { getSDK,
        getUniqueName }   = require('./helper');

describe('Expectations', function () {
  this.timeout(DEFAULT_TIMEOUT);

  const logic = JSON.stringify({
    "logic": {
      "or": [
        {"===": [{"pointer": "group"}, "error"]},
        {"===": [{"pointer": "group"}, "warn"]}
      ]
    }
  });

  it('can create an expectation', () => {
    return co(function* () {
      const Expectation = getSDK('Expectation');

      const resource = yield Expectation.create({ 
        name: getUniqueName(),
        logic
      }).should.be.fulfilled();

      yield Expectation.remove(resource.id);
    });
  });

  it('can find expectations', () => {
    return co(function* () {
      const Expectation = getSDK('Expectation');

      yield Expectation.find({}).should.be.fulfilled();
    });
  });

  it('can find expectations by id', () => {
    return co(function* () {
      const Expectation = getSDK('Expectation');

      const resource = yield Expectation.create({ 
        name: getUniqueName(),
        logic
      }).should.be.fulfilled();

      yield Expectation.findById(resource.id).should.be.fulfilled();

      yield Expectation.remove(resource.id);
    });
  });

  it('can delete an expectation by id', () => {
    return co(function* () {
      const Expectation = getSDK('Expectation');

      const resource = yield Expectation.create({ 
        name: getUniqueName(),
        logic
      }).should.be.fulfilled();

      yield Expectation.remove(resource.id).should.be.fulfilled();
    });
  });

  it('can update expectations by id', () => {
    return co(function* () {
      const Expectation = getSDK('Expectation');

      const resource = yield Expectation.create({ 
        name: getUniqueName(),
        logic
      }).should.be.fulfilled();

      yield Expectation.update(resource.id, {
        name: getUniqueName()
      }).should.be.fulfilled();

      yield Expectation.remove(resource.id);
    });
  });

  it('can check an expectations by id', () => {
    return co(function* () {
      const Expectation = getSDK('Expectation');

      const resource = yield Expectation.create({ 
        name: getUniqueName(),
        logic
      }).should.be.fulfilled();

      yield Expectation.check(resource.id).should.be.fulfilled();

      yield Expectation.remove(resource.id);
    });
  });
});
