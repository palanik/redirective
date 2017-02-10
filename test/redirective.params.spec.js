import redirector from '../src/index.js';
import httpMocks from 'node-mocks-http';

let chai = require('chai');

chai.should();

describe('Params', () => {
  it('single', () => {
    const req  = httpMocks.createRequest({
        method: 'GET',
        url: '/myroute/23',
        params: {
          id: 23
        }
    });
    const res = httpMocks.createResponse();

    redirector('/my-other-route/:id')(req, res);

    res.statusCode.should.eql(302);
    res._getRedirectUrl().should.eql('/my-other-route/23');
  });

  it('swap', () => {
    const req  = httpMocks.createRequest({
        method: 'GET',
        url: '/users/34/books/8989',
        params: {
          userId: "34",
          bookId: "8989"
        }
    });
    const res = httpMocks.createResponse();

    redirector('/books/:bookId/users/:userId')(req, res);

    res.statusCode.should.eql(302);
    res._getRedirectUrl().should.eql('/books/8989/users/34');
  });

  it('skip', () => {
    const req  = httpMocks.createRequest({
        method: 'GET',
        url: '/users/34/books/8989',
        params: {
          userId: "34",
          bookId: "8989"
        }
    });
    const res = httpMocks.createResponse();

    redirector('/books/:bookId')(req, res);

    res.statusCode.should.eql(302);
    res._getRedirectUrl().should.eql('/books/8989');
  });

  it('optional', () => {
    const req  = httpMocks.createRequest({
        method: 'GET',
        url: '/users-books/34/',
        params: {
          userId: "34"
        }
    });
    const res = httpMocks.createResponse();

    redirector('/books/:userId/:bookId?')(req, res);

    res.statusCode.should.eql(302);
    res._getRedirectUrl().should.eql('/books/34');
  });

  it('prefix', () => {
    const req  = httpMocks.createRequest({
        method: 'GET',
        url: '/books/1234567890',
        params: {
          isbn: "1234567890"
        }
    });
    const res = httpMocks.createResponse();

    redirector('/store/isbn-:isbn')(req, res);

    res.statusCode.should.eql(302);
    res._getRedirectUrl().should.eql('/store/isbn-1234567890');
  });

  it('suffix', () => {
    const req  = httpMocks.createRequest({
        method: 'GET',
        url: '/books/1234567890',
        params: {
          isbn: "1234567890"
        }
    });
    const res = httpMocks.createResponse();

    redirector('/store/:isbn-book')(req, res);

    res.statusCode.should.eql(302);
    res._getRedirectUrl().should.eql('/store/1234567890-book');
  });

  it('hypen', () => {
    const req  = httpMocks.createRequest({
        method: 'GET',
        url: '/airtravel/LAX-SFO',
        params: {
          from: "LAX",
          to: "SFO"
        }
    });
    const res = httpMocks.createResponse();

    redirector('/flights/:from-:to')(req, res);

    res.statusCode.should.eql(302);
    res._getRedirectUrl().should.eql('/flights/LAX-SFO');
  });

  it('dot', () => {
    const req  = httpMocks.createRequest({
        method: 'GET',
        url: '/plantae/Prunus.persica',
        params: {
          genus: "Prunus",
          species: "persica"
        }
    });
    const res = httpMocks.createResponse();

    redirector('/plants/:genus.:species')(req, res);

    res.statusCode.should.eql(302);
    res._getRedirectUrl().should.eql('/plants/Prunus.persica');
  });

});
