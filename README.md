# redirective
A shortcut to provide [redirect](https://expressjs.com/en/4x/api.html#res.redirect) callback to Express routes.

## Installation

```sh
$ npm install redirective --save
```

## Usage

```
var redirect = require('redirective');

var express = require('express');
var app = express();

app.use('/my-route', redirect('http://myothersite.com/my-route'));  // default redirect
app.use('/my-other-route', redirect(301, 'http://myothersite.com/my-other-route')); // permanent redirect

app.get('/my-get-route', redirect('/my-other-get-route'));  // GET only

app.listen(3000);
```

## API

### Redirect
```
redirect([status,] url);
```
* `status` - A positive integer that corresponds to an [HTTP status code](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html). Defaults to 302
* `path` - partial or full url to redirect to.


## License

  [MIT](LICENSE)
