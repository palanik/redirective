# redirective
Shortcut to provide [redirect](https://expressjs.com/en/4x/api.html#res.redirect) callback to Express routes.

```JS
app.use('/users/:userId', redirect('https://new-server/users/:userId'));
```

[![NPM version](https://img.shields.io/npm/v/redirective.svg?style=flat)](https://www.npmjs.org/package/redirective)
[![Build Status](https://img.shields.io/travis/palanik/redirective.svg?style=flat)](https://travis-ci.org/palanik/redirective)
[![Coverage Status](https://coveralls.io/repos/palanik/redirective/badge.svg?service=github)](https://coveralls.io/github/palanik/redirective)


## Installation

```sh
$ npm install redirective --save
```

## Usage

```JS
var redirect = require('redirective');

var express = require('express');
var app = express();

app.use('/my-route', redirect('http://myothersite.com/my-route'));  // default redirect
app.use('/my-other-route', redirect(301, 'http://myothersite.com/my-other-route')); // permanent redirect


app.listen(3000);
```

## Examples

### Route specific
```JS
app.use('/all-methods', redirect('/my-other-route'));  // All methods
```

### HTTP Method specific
```JS
app.get('/my-get-route', redirect('/my-other-get-route'));  // GET only
```

### Fully-qualified URL for redirecting to a different site
```JS
app.get('/my-route', redirect('http://expressjs.com/en/guide/routing.html'));
```

### Relative to the current URL
```JS
app.get('/blog/admin/', redirect('post/new'));  // Redirects to /blog/admin/post/new
app.get('/blog/admin', redirect('post/new'));  // Redirects to /blog/post/new
```
For additional use cases refer to [Express Redirect](http://expressjs.com/en/4x/api.html#res.redirect).

### URL with parameters
```JS
app.get('/users/:userId', redirect('http://my-other-site/app/readers/:userId')); // /users/1234 => http://my-other-site/app/readers/1234
app.get('/users/:userId/books/:bookId', redirect('/books/:bookId/users/:userId')); // /users/1234/books/6789 => /books/6789/users/1234
```

## API

```JS
redirect([status,] url);
```
Same signature as [`res.redirect`](http://expressjs.com/en/4x/api.html#res.redirect)

* `status` - A positive integer that corresponds to an [HTTP status code](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html).

    Defaults to 302.

* `url` - partial or full url to redirect to.

    The url can have [Express Route](https://expressjs.com/en/guide/routing.html#route-parameters) style named parameters.

    Named parameters in redirect url will be substituted with values from same named parameters in source path.

    Refer [example](#url-with-parameters).


## License

  [MIT](LICENSE)
