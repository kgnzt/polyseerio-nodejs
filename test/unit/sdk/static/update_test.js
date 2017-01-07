'use strict';

const should = require('should'),
      sinon  = require('sinon'),
      helper = require('./helper');

describe('Static: update', () => {
  const method = require('../../../../lib/sdk/static/update');

  const id = 100,
        updates = {
          foo: 'bar'
        },
        options = {};

  it('makes the correct call to put', () => {
    const context = helper.getContext();

    context.request.put.returns(global.Promise.resolve());

    return method(id, updates, options, context).
      then(_ => {
        context.request.put.called.should.eql(true);
        context.request.put.calledWithExactly({
          uri: context.uri,
          body: updates
        }).should.eql(true);
      });
  });

  it('defaults updates to an empty object', () => {
    const context = helper.getContext();

    context.request.put.returns(global.Promise.resolve());

    return method(id, {}, options, context).
      then(_ => {
        context.request.put.args[0][0].body.should.eql({});
      });
  });

  it('resolves when put resolves', () => {
    const context = helper.getContext(),
          result = sinon.stub();

    context.request.put.returns(global.Promise.resolve(result));

    return method(id, updates, options, context).should.be.fulfilled(result);
  });

  it('rejects when put rejects', () => {
    const context = helper.getContext(),
          error = new Error('foo');

    context.request.put.returns(global.Promise.reject(error));

    return method(id, updates, options, context).should.be.rejectedWith(error);
  });
});
