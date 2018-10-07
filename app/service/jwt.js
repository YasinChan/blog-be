'use strict';

const Service = require('egg').Service;

const jwt = require('jsonwebtoken');

class JwtService extends Service {
  sign(payload) {
    return jwt.sign(payload, this.config.keys);
  }

  verify(token) {
    return jwt.verify(token, this.config.keys);
  }
}

module.exports = JwtService;
