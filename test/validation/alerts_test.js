'use strict';

const should              = require('should'),
      co                  = require('co'),
      { DEFAULT_TIMEOUT } = require('./config'),
      { setup,
        teardown,
        getUniqueName }   = require('./helper');

describe('Alert', function () {
  this.timeout(DEFAULT_TIMEOUT);

  let Client = null,
      Alert = null;

  before(() => {
    return setup().then(C => [Client, Alert] = [C, C.Alert]);
  });

  after(() => teardown(Client));

  it('can create an alert', () => {
    return co(function* () {
      const resource = yield Alert.create({ 
        name: getUniqueName(),
        protocol: 'smtp',
        recipients: ['foo@bar.com']
      }).should.be.fulfilled();

      yield Alert.remove(resource.id);
    });
  });

  it('can find alerts', () => {
    return co(function* () {
      yield Alert.find({}).should.be.fulfilled();
    });
  });

  it('can find alerts by id', () => {
    return co(function* () {
      const resource = yield Alert.create({ 
        name: getUniqueName(),
        protocol: 'smtp',
        recipients: ['foo@bar.com']
      }).should.be.fulfilled();

      yield Alert.findById(resource.id).should.be.fulfilled();

      yield Alert.remove(resource.id);
    });
  });

  it('can find alerts by name', () => {
    return co(function* () {
      const name = getUniqueName();

      const resource = yield Alert.create({ 
        name,
        protocol: 'smtp',
        recipients: ['foo@bar.com']
      }).should.be.fulfilled();

      yield Alert.findByName(name).should.be.fulfilled().
        then(found => {
          found.name.should.eql(name);

          return Alert.remove(found.id);
        });
    });
  });


/*
  it('can trigger an alert by id', () => {
    return co(function* () {
      const resource = yield Alert.create({ 
        name: getUniqueName(),
        protocol: 'smtp',
        recipients: ['foo@bar.com']
      }).should.be.fulfilled();

      yield Alert.trigger(resource.id).should.be.fulfilled();

      yield Alert.remove(resource.id);
    });
  });
*/

  it('can delete an alert by id', () => {
    return co(function* () {
      const resource = yield Alert.create({ 
        name: getUniqueName(),
        protocol: 'smtp',
        recipients: ['foo@bar.com']
      }).should.be.fulfilled();

      yield Alert.remove(resource.id).should.be.fulfilled();
    });
  });
});
