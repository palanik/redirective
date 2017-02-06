import redirector from '../src/index.js';
import httpMocks from 'node-mocks-http';

let chai = require('chai');

chai.should();

describe('Simple', () => {
  it('defaults', () => {
    const req  = httpMocks.createRequest({
        method: 'GET',
        url: '/myroute'
    });
    const res = httpMocks.createResponse();

    redirector('https://github.com')(req, res);

    res.statusCode.should.eql(302);
    res._getRedirectUrl().should.eql('https://github.com');
  });

  it('status', () => {
    const req  = httpMocks.createRequest({
        method: 'GET',
        url: '/myroute'
    });
    const res = httpMocks.createResponse();

    redirector(303, 'https://github.com')(req, res);

    res.statusCode.should.eql(303);
    res._getRedirectUrl().should.eql('https://github.com');
  });

});
