'use strict';

const should = require('should'),
      sinon  = require('sinon'),
      helper = require('./helper');

describe('Static: remove', () => {
  const method = require('../../../../lib/sdk/static/remove');

  const id = 100,
        options = {};

  it('makes the correct call to del', () => {
    const context = helper.getContext();

    context.request.del.returns(global.Promise.resolve());

    return method(id, options, context).
      then(_ => {
        context.request.del.called.should.eql(true);
        context.request.del.calledWithExactly({
          uri: context.uri
        }).should.eql(true);
      });
  });

  it('resolves when del resolves', () => {
    const context = helper.getContext(),
          result = sinon.stub();

    context.request.del.returns(global.Promise.resolve(result));

    return method(id, options, context).should.be.fulfilled(result);
  });

  it('rejects when del rejects', () => {
    const context = helper.getContext(),
          error = new Error('foo');

    context.request.del.returns(global.Promise.reject(error));

    return method(id, options, context).should.be.rejectedWith(error);
  });
});
