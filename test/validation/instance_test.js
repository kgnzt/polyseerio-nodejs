'use strict';

const should              = require('should'),
      co                  = require('co'),
      behavior            = require('./shared_behavior'),
      { DEFAULT_TIMEOUT } = require('./config'),
      { setup,
        teardown,
        getUniqueName }   = require('./helper');

describe('Instances', function () {
  this.timeout(DEFAULT_TIMEOUT);

  before(function () {
    return setup(this).
      then(_ => {
        this.Resource = this.client.Instance;
      });
  });

  after(function () { teardown(this); });

  beforeEach(function () {
    this.attributes = {
      name: getUniqueName()
    };
  });

  behavior.creatable();
  behavior.findable();
  behavior.uniquelyNameable();
  behavior.updatable();
  behavior.removable();

  // Consider attachable behavior.

  it('can attach to an instance by id', function () {
    const Instance = this.Resource,
          client = this.client;

    return co(function* () {
      let instance = yield Instance.create({ 
        name: getUniqueName()
      }).should.be.fulfilled();

      instance = yield Instance.attach(instance.id, {
        strategy: client.Strategy.ID
      }).should.be.fulfilled();
    });
  });

  it('can attach based on name fallback', function () {
    const Instance = this.Resource,
          client = this.client;

    return co(function* () {
      const instance = yield Instance.attach(getUniqueName(), {
        strategy: client.Strategy.FALLBACK
      }).should.be.fulfilled();
    });
  });

  it('can send gauge metrics', function () {
    const Instance = this.Resource;

    return co(function* () {
      let resource = yield Instance.create({ 
        name: getUniqueName()
      }).should.be.fulfilled();

      const gauge = yield resource.gauge({
        foo: 22
      }).should.be.fulfilled();

      resource = yield Instance.findById(resource.get('id')).should.be.fulfilled();

      resource.get('gauges').foo[0][0].should.eql(22);
    });
  });

  it('can set instance facts', function () {
    const Instance = this.Resource;

    return co(function* () {
      let resource = yield Instance.create({ 
        name: getUniqueName()
      }).should.be.fulfilled();

      const fact = yield resource.fact({
        foo: 'bar'
      }).should.be.fulfilled();

      resource = yield Instance.findById(resource.get('id')).should.be.fulfilled();

      resource.get('facts').foo.value.should.eql('bar');
    });
  });
});
