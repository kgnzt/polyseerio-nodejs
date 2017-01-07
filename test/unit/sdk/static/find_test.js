'use strict';

const should = require('should'),
      sinon  = require('sinon'),
      helper = require('./helper');

describe('Static: find', () => {
  const method = require('../../../../lib/sdk/static/find');

  const query = {
          foo: 'bar'
        },
        options = {};

  it('makes the correct call to get', () => {
    const context = helper.getContext();

    context.request.get.returns(global.Promise.resolve());

    return method(query, options, context).
      then(_ => {
        context.request.get.called.should.eql(true);
        context.request.get.calledWithExactly({
          uri: context.uri,
          qs: query
        }).should.eql(true);
      });
  });

  it('defaults query to an empty object', () => {
    const context = helper.getContext();

    context.request.get.returns(global.Promise.resolve());

    return method({}, options, context).
      then(_ => {
        context.request.get.args[0][0].qs.should.eql({});
      });
  });

  it('resolves when get resolves', () => {
    const context = helper.getContext(),
          result = sinon.stub();

    context.request.get.returns(global.Promise.resolve(result));

    return method(query, options, context).should.be.fulfilled(result);
  });

  it('rejects when get rejects', () => {
    const context = helper.getContext(),
          error = new Error('foo');

    context.request.get.returns(global.Promise.reject(error));

    return method(query, options, context).should.be.rejectedWith(error);
  });
});
