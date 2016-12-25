'use strict';

const co                = require('co'),
      lodash            = require('lodash'),
      { getUniqueName } = require('./helper');

function canRemove (Resource) {
  return lodash.has(Resource, 'remove');
}

/**
 * Ensure that a resource is creatable.
 */
exports.creatable = function () {
  it('can create an instance statically: Resource.create', function()  {
    return this.Resource.create(this.attributes). 
      should.be.fulfilled().
      then(instance => {
        if (canRemove(this.Resource)) {
          return this.Resource.remove(instance.get('id'));
        }
      }).should.be.fulfilled();
  });

  it('can create an instance using: new and instance.save', function()  {
    const instance = new this.Resource(this.attributes);

    return instance.save().
      should.be.fulfilledWith(instance).
      then(instance => {
        if (canRemove(this.Resource)) {
          return this.Resource.remove(instance.get('id'));
        }
      }).should.be.fulfilled();
  });
};

/**
 * Ensure that a resource is findable.
 */
exports.findable = function () {
  it('can find an instance statically by id: Resource.findById', function()  {
    return this.Resource.create(this.attributes).
      then(instance => {
        return this.Resource.findById(instance.get('id'));
      }).should.be.fulfilled().
      then(instance => {
        if (canRemove(this.Resource)) {
          return this.Resource.remove(instance.get('id'));
        }
      }).should.be.fulfilled();
  });
};

/**
 * Ensure that a resource is findable by name.
 */
exports.uniquelyNameable = function () {
  it('can find an instance statically by name: Resource.findByName', function()  {
    return this.Resource.create(this.attributes).
      then(instance => {
        return this.Resource.findByName(instance.get('name'));
      }).should.be.fulfilled().
      then(instance => {
        if (canRemove(this.Resource)) {
          return this.Resource.remove(instance.get('id'));
        }
      }).should.be.fulfilled();
  });
};

/**
 * Ensure that a resource is removable.
 */
exports.removable = function () {
  it('can remove an instance statically: Resource.remove', function()  {
    return this.Resource.create(this.attributes). 
      should.be.fulfilled().
      then(instance => {
        const id = instance.get('id');

        return this.Resource.remove(id).should.be.fulfilled().
          then(_ => {
            return id;
          });
      }).then(id => {
        return this.Resource.findById(id).should.be.rejected();
      });
  });

  it('can remove an instance using: instance.remove', function()  {
    return this.Resource.create(this.attributes). 
      should.be.fulfilled().
      then(instance => {
        const id = instance.get('id');

        return instance.remove().should.be.fulfilled().
          then(_ => {
            return id;
          });
      }).then(id => {
        return this.Resource.findById(id).should.be.rejected();
      });
  });
};

/**
 * Ensure that a resource is updatable.
 */
exports.updatable = function () {
  it('can update an instance statically: Resource.update', function()  {
    const name = getUniqueName();

    return this.Resource.create(this.attributes). 
      should.be.fulfilled().
      then(instance => {
        return this.Resource.update(instance.get('id'), { name });
      }).should.be.fulfilled().
      then(instance => {
        instance.get('name').should.eql(name);

        return this.Resource.findById(instance.get('id'));
      }).
      then(instance => {
        instance.get('name').should.eql(name);

        if (canRemove(this.Resource)) {
          return this.Resource.remove(instance.get('id'));
        }
      }).should.be.fulfilled();
  });

  it('can update an instance using: instance.save', function()  {
    const name = getUniqueName();

    return this.Resource.create(this.attributes). 
      should.be.fulfilled().
      then(instance => {
        instance.set('name', name);

        return instance.save().should.be.fulfilled();
      }).then(instance => {
        return this.Resource.findById(instance.get('id'));
      }).then(instance => {
        instance.get('name').should.eql(name);

        if (canRemove(this.Resource)) {
          return this.Resource.remove(instance.get('id'));
        }
      }).should.be.fulfilled();
  });
};

/**
 * Ensure that a resource is triggerable.
 */
exports.triggerable = function () {
  it('can trigger an instance statically: Resource.trigger', function()  {
    return this.Resource.create(this.attributes). 
      should.be.fulfilled().
      then(instance => {
        return this.Resource.trigger(instance.get('id'), {}).should.be.fulfilled();
      }).then(instance => {
        if (canRemove(this.Resource)) {
          return this.Resource.remove(instance.get('id'));
        }
      }).should.be.fulfilled();
  });
};

/**
 * Ensure that a resource is messagable.
 */
exports.messageable = function () {
  it('can message an instance statically: Resource.message', function()  {
    return this.Resource.create(this.attributes). 
      should.be.fulfilled().
      then(instance => {
        return this.Resource.message(instance.get('id'), 'hello world').
          then(_ => {
            return instance.get('id');
          });
      }).should.be.fulfilled().
      then(id => {
        if (canRemove(this.Resource)) {
          return this.Resource.remove(id);
        }
      }).should.be.fulfilled();
  });
};
