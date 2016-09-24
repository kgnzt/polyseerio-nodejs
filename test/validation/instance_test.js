'use strict';

const should              = require('should'),
      co                  = require('co'),
      { DEFAULT_TIMEOUT } = require('./config'),
      { getSDK,
        getUniqueName }   = require('./helper');

describe('Instances', function () {
  this.timeout(DEFAULT_TIMEOUT);

  const Instance = getSDK('Instance');

  it('can create an instance', () => {
    return co(function* () {
      yield Instance.create({ 
        name: getUniqueName()
      }).should.be.fulfilled();
    });
  });

  it('can find instances', () => {
    return co(function* () {
      yield Instance.find({}).should.be.fulfilled();
    });
  });

  it('can find instances by id', () => {
    return co(function* () {
      const resource = yield Instance.create({ 
        name: getUniqueName()
      }).should.be.fulfilled();

      yield Instance.findById(resource.id).should.be.fulfilled();
    });
  });

  it('can attach to an instance by id', () => {
    return co(function* () {
      let instance = yield Instance.create({ 
        name: getUniqueName()
      }).should.be.fulfilled();

      instance = yield Instance.attach(instance.id, {
        strategy: Instance.attach.ID
      }).should.be.fulfilled();
    });
  });

  it('can attach to an instance by name', () => {
    return co(function* () {
      let instance = yield Instance.create({ 
        name: getUniqueName()
      }).should.be.fulfilled();

      instance = yield Instance.attach(instance.name, {
        strategy: Instance.attach.NAME
      }).should.be.fulfilled();
    });
  });

  it('can attach based on name fallback', () => {
    return co(function* () {
      const instance = yield Instance.attach(getUniqueName(), {
        strategy: Instance.attach.FALLBACK
      }).should.be.fulfilled();
    });
  });

  it('can delete an instance by id', () => {
    return co(function* () {
      const resource = yield Instance.create({ 
        name: getUniqueName()
      }).should.be.fulfilled();

      yield Instance.remove(resource.id).should.be.fulfilled();
    });
  });
});
