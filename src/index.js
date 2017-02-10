import pathToRegexp from 'path-to-regexp';

export default
function redirector(...args) {
  const path = (args.length < 2) ? args[0] : args[1];
  const status = (args.length > 1) ? args[0] : 302;

  return function redirect(req, res) {
    res.redirect(status, pathToRegexp.compile(path)(req.params));
  };
}

module.exports = redirector;
