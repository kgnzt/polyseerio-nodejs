'use strict';

const should = require('should'),
      sinon  = require('sinon'),
      helper = require('./helper');

describe('Static: trigger', () => {
  const method = require('../../../../lib/sdk/static/trigger');

  const id = 100,
        meta = {
          foo: 'bar'
        },
        options = {};

  it('makes the correct call to post', () => {
    const context = helper.getContext();

    context.request.post.returns(global.Promise.resolve());

    return method(id, meta, options, context).
      then(_ => {
        context.request.post.called.should.eql(true);
        context.request.post.calledWithExactly({
          uri: `${context.uri}/trigger`,
          body: { meta }
        }).should.eql(true);
      });
  });

  it('defaults body to an empty meta object', () => {
    const context = helper.getContext();

    context.request.post.returns(global.Promise.resolve());

    return method(id, {}, options, context).
      then(_ => {
        context.request.post.args[0][0].body.should.eql({ meta: {} });
      });
  });

  it('resolves when post resolves', () => {
    const context = helper.getContext(),
          result = sinon.stub();

    context.request.post.returns(global.Promise.resolve(result));

    return method(id, meta, options, context).should.be.fulfilled(result);
  });

  it('rejects when post rejects', () => {
    const context = helper.getContext(),
          error = new Error('foo');

    context.request.post.returns(global.Promise.reject(error));

    return method(id, meta, options, context).should.be.rejectedWith(error);
  });
});
