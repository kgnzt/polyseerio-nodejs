'use strict';

const should = require('should'),
      sinon  = require('sinon'),
      helper = require('./helper');

describe('Static: create', () => {
  const method = require('../../../../lib/sdk/static/create');

  const attributes = {
          foo: 'bar'
        },
        options = {};

  it('makes the correct call to put', () => {
    const context = helper.getContext();

    context.request.post.returns(global.Promise.resolve());

    return method(attributes, options, context).
      then(_ => {
        context.request.post.called.should.eql(true);
        context.request.post.calledWithExactly({
          uri: context.uri,
          body: attributes
        }).should.eql(true);
      });
  });

  it('defaults attributes to an empty object', () => {
    const context = helper.getContext();

    context.request.post.returns(global.Promise.resolve());

    return method(undefined, options, context).
      then(_ => {
        context.request.post.args[0][0].body.should.eql({});
      });
  });

  it('resolves when post resolves', () => {
    const context = helper.getContext(),
          result = sinon.stub();

    context.request.post.returns(global.Promise.resolve(result));

    return method(attributes, options, context).should.be.fulfilled(result);
  });

  it('rejects when post rejects', () => {
    const context = helper.getContext(),
          error = new Error('foo');

    context.request.post.returns(global.Promise.reject(error));

    return method(attributes, options, context).should.be.rejectedWith(error);
  });
});
