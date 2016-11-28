'use strict';

const should              = require('should'),
      co                  = require('co'),
      { DEFAULT_TIMEOUT } = require('./config'),
      { setup,
        teardown,
        getUniqueName }   = require('./helper');

describe('Environment', function () {
  this.timeout(DEFAULT_TIMEOUT);

  let Client = null,
      Environment = null;

  before(() => {
    return setup().then(C => [Client, Environment] = [C, C.Environment]);
  });

  after(() => teardown(Client));

  it('can create an environment', () => {
    return co(function* () {
      const resource = yield Environment.create({ 
        name: getUniqueName()
      }).should.be.fulfilled();

      yield Environment.remove(resource.id);
    });
  });

  it('can find environments', () => {
    return co(function* () {
      yield Environment.find({}).should.be.fulfilled();
    });
  });

  it('can find environments by id', () => {
    return co(function* () {
      const resource = yield Environment.create({ 
        name: getUniqueName(),
        protocol: 'smtp',
        recipients: ['foo@bar.com']
      }).should.be.fulfilled();

      yield Environment.findById(resource.id).should.be.fulfilled();

      yield Environment.remove(resource.id);
    });
  });

  it('can find environments by name', () => {
    return co(function* () {
      const name = getUniqueName();

      const resource = yield Environment.create({ 
        name
      }).should.be.fulfilled();

      yield Environment.findByName(name).should.be.fulfilled().
        then(found => {
          found.name.should.eql(name);

          return Environment.remove(found.id);
        });
    });
  });

  it('can update environments by id', () => {
    return co(function* () {
      const resource = yield Environment.create({ 
        name: getUniqueName()
      }).should.be.fulfilled();

      yield Environment.update(resource.id, {
        name: getUniqueName()
      }).should.be.fulfilled();

      yield Environment.remove(resource.id);
    });
  });

  it('can delete an environment by id', () => {
    return co(function* () {
      const resource = yield Environment.create({ 
        name: getUniqueName(),
        protocol: 'smtp',
        recipients: ['foo@bar.com']
      }).should.be.fulfilled();

      yield Environment.remove(resource.id).should.be.fulfilled();
    });
  });

  // need better cleanup
  it('can message an environment by id', () => {
    return co(function* () {
      const resource = yield Environment.create({ 
        name: getUniqueName(),
        protocol: 'smtp',
        recipients: ['foo@bar.com']
      }).should.be.fulfilled();

      const message = yield Environment.message(resource.id, 'hello world').should.be.fulfilled();

      yield Environment.remove(resource.id);
    });
  });
});
