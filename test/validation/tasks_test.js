'use strict';

const should              = require('should'),
      co                  = require('co'),
      { DEFAULT_TIMEOUT } = require('./config'),
      { setup,
        teardown,
        getUniqueName }   = require('./helper');

describe('Task', function () {
  this.timeout(DEFAULT_TIMEOUT);

  let Client = null,
      Task = null;

  before(() => {
    return setup().then(C => [Client, Task] = [C, C.Task]);
  });

  after(() => teardown(Client));

  it('can create an task', () => {
    return co(function* () {
      const resource = yield Task.create({ 
        name: getUniqueName(),
        protocol: 'smtp',
        recipients: ['foo@bar.com']
      }).should.be.fulfilled();

      yield Task.remove(resource.id);
    });
  });

  it('can find tasks', () => {
    return co(function* () {
      yield Task.find({}).should.be.fulfilled();
    });
  });

  it('can find tasks by id', () => {
    return co(function* () {
      const resource = yield Task.create({ 
        name: getUniqueName(),
        protocol: 'smtp',
        recipients: ['foo@bar.com']
      }).should.be.fulfilled();

      yield Task.findById(resource.id).should.be.fulfilled();

      yield Task.remove(resource.id);
    });
  });

  it('can update tasks by id', () => {
    return co(function* () {
      const resource = yield Task.create({ 
        name: getUniqueName()
      }).should.be.fulfilled();

      yield Task.update(resource.id, {
        name: getUniqueName()
      }).should.be.fulfilled();

      yield Task.remove(resource.id);
    });
  });

  it('can delete an task by id', () => {
    return co(function* () {
      const resource = yield Task.create({ 
        name: getUniqueName(),
        protocol: 'smtp',
        recipients: ['foo@bar.com']
      }).should.be.fulfilled();

      yield Task.remove(resource.id).should.be.fulfilled();
    });
  });
});
