"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractRequestToken;

function extractRequestToken(req) {
  let token = undefined;

  if (req) {
    if (req.query && req.query.token) {
      token = req.query.token;
    } else if (req.headers && req.headers.authorization) {
      // Get the token after the BEARER part
      const tmp = req.headers.authorization.split(' ');

      if (tmp.length === 2 && tmp[0] === 'Bearer') {
        token = tmp[1];
      }
    }
  }

  return token;
}