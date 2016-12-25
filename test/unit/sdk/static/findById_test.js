'use strict';

const should = require('should'),
      sinon  = require('sinon'),
      helper = require('./helper');

describe('Static: findById', () => {
  const method = require('../../../../lib/sdk/static/findById');

  const id = 100,
        options = {};

  it('makes the correct call to get', () => {
    const context = helper.getContext();

    context.request.get.returns(global.Promise.resolve());

    return method(id, options, context).
      then(_ => {
        context.request.get.called.should.eql(true);
        context.request.get.calledWithExactly({
          uri: context.uri
        }).should.eql(true);
      });
  });

  it('resolves when get resolves', () => {
    const context = helper.getContext(),
          result = sinon.stub();

    context.request.get.returns(global.Promise.resolve(result));

    return method(id, options, context).should.be.fulfilled(result);
  });

  it('rejects when get rejects', () => {
    const context = helper.getContext(),
          error = new Error('foo');

    context.request.get.returns(global.Promise.reject(error));

    return method(id, options, context).should.be.rejectedWith(error);
  });
});
