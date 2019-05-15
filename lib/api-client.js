/**
 * A client for the web api.
 */
"use strict";

var _ = require('lodash'),
  fs = require('fs'),
  url = require('url'),
  uuid = require('uuid/v1'),
  contract = require('./contract');

/**
 * Constructor for the ApiClient.
 * @param {String} serverUrl
 * @param {Object} options
 */
var ApiClient = function (serverUrl, options) {
  contract(arguments)
    .params('string')
    .params('string', 'object')
    .end();

  var reqOptions = {
    method: 'POST',
    headers: {
      'Connection': 'keep-alive',
      'Content-Type': 'application/json; charset=utf-8',
      'Accept-Charset': 'utf-8',
      'User-Agent': 'ApiClient'
    }
  };

  this.baseUrl = serverUrl;
  this.cookies = {};

  if (_.startsWith(serverUrl, 'https')) {
    reqOptions = _.merge(reqOptions, {
      key: fs.readFileSync('../keys/agent2-key.pem'),
      cert: fs.readFileSync('../keys/agent2-cert.pem')
    });

    this.reqOptions = _.extend(reqOptions, options);

    this.http = require('https');
  } else {
    this.reqOptions = _.extend(reqOptions, options);

    this.http = require('http');
  }
}

ApiClient.prototype = {
  _createRequest: function (isAsync, serviceName, callback) {
    var input = isAsync ? '/a/' + serviceName + '.common.kdsvc' : serviceName + '.common.kdsvc';
    var serverUrl = new url.URL(input, this.baseUrl);

    return this.http.request(
      _.extend({
        hostname: serverUrl.hostname,
        port: serverUrl.port,
        path: serverUrl.pathname,
      }, this.reqOptions),
      callback
    );
  },

  _createRequestId: function () {
    return uuid();
  },

  /**
   * 同步执行
   * @param {String} serviceName
   * @param {Array} parameters
   * @param {Function} callback
   * @return {Promise}
   */
  execute: function (serviceName, parameters, callback) {
    this.data = '';
    var _data = this.data;

    return new Promise((resolve, reject) => {
      var data = {
        rid: this._createRequestId(),
        parameters: parameters,
        timestamp: _.now(),
        v: '1.0'
      }

      var req = this._createRequest(false, serviceName, (res) => {
        this.cookies = res.headers['set-cookie'];
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          _data = _data + chunk;
        });
        res.on('end', () => {
          _data = JSON.parse(_data);
          resolve(_data);
        });
      });

      data = JSON.stringify(data);
      req.setHeader('Content-Length', data.length);
      req.setHeader('Cookie', this.cookies);
      req.on('error', (err) => {
        reject(err);
      });
      req.write(data);
      req.end();
    });
  },

  /**
   * 异步执行
   * @param {String} serviceName
   * @param {Array} parameters
   * @param {Function} callback
   * @return {Promise}
   */
  executeAsync: function (serviceName, parameters, callback) {
    return new Promise((resolve, reject) => {
      var data = {
        rid: this._createRequestId(),
        parameters: parameters,
        timestamp: _.now(),
        v: '1.0'
      }

      var req = this._createRequest(true, serviceName, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          revData = revData + chunk;
        });
        res.on('end', () => {
          console.log(`BODY: ${revData}`);
          resolve(revData);
        });
      });
      data = JSON.stringify(data);
      req.setHeader('Content-Length', data.length);
      req.on('error', (err) => {
        reject(err);
      });
      req.write(data);
      req.end();
    });
  },

  /**
   * 登录
   * @param {String} dbId 账套id
   * @param {String} userName 用户名
   * @param {String} password 密码
   * @param {Integer} lcid 语言id (中文2052，英文1033，繁体3076)
   * @return {Promise}
   */
  login: function (dbId, userName, password, lcid) {
    lcid = lcid || 2052;

    return this.execute('Kingdee.BOS.WebApi.ServicesStub.AuthService.ValidateUser', [
      dbId, userName, password, lcid
    ]);
  },

  /**
   * 第三方应用登录
   * @param {String} dbId 账套id
   * @param {String} userName 用户名
   * @param {String} appId 应用id
   * @param {String} appSecret 应用密钥
   * @param {Integer} lcid 语言id (中文2052，英文1033，繁体3076)
   * @return {Promise}
   */
  loginByAppSecret: function (dbId, userName, appId, appSecret, lcid) {
    lcid = lcid || 2052;

    return this.execute('Kingdee.BOS.WebApi.ServicesStub.AuthService.LoginByAppSecret', [
      dbId, userName, appId, appSecret, lcid
    ]);
  },

  /**
   * 第三方应用登录2
   * @param {String} dbId 账套id
   * @param {String} userName 用户名
   * @param {String} appId 应用id
   * @param {String} appSecret 应用密钥
   * @param {Boolean} isKickOff
   * @param {Integer} lcid 语言id (中文2052，英文1033，繁体3076)
   * @return {Promise}
   */
  loginByAppSecret2: function (dbId, userName, appId, appSecret, isKickOff, lcid) {
    lcid = lcid || 2052;

    return this.execute('Kingdee.BOS.WebApi.ServicesStub.AuthService.LoginByAppSecret2', [
      dbId, userName, appId, appSecret, isKickOff, lcid
    ]);
  },

  /**
   * 签名方式登录
   * @param {String} dbId 账套id
   * @param {String} userName 用户名
   * @param {String} appId 应用id
   * @param {String} timestamp 时间戳
   * @param {String} sign 签名
   * @param {Integer} lcid 语言id (中文2052，英文1033，繁体3076)
   * @return {Promise}
   */
  loginBySign: function (dbId, userName, appId, timestamp, sign, lcid) {
    lcid = lcid || 2052;

    return this.execute('Kingdee.BOS.WebApi.ServicesStub.AuthService.LoginBySign', [
      dbId, userName, appId, timestamp, sign, lcid
    ]);
  },

  /**
   * 签名方式登录2
   * @param {String} dbId 账套id
   * @param {String} userName 用户名
   * @param {String} appId 应用id
   * @param {String} timestamp 时间戳
   * @param {String} sign 签名
   * @param {Boolean} isKickOff
   * @param {Integer} lcid 语言id (中文2052，英文1033，繁体3076)
   * @return {Promise}
   */
  loginBySign2: function (dbId, userName, appId, timestamp, sign, isKickOff, lcid) {
    return this.execute('Kingdee.BOS.WebApi.ServicesStub.AuthService.LoginBySign2', [
      dbId, userName, appId, timestamp, sign, isKickOff, lcid
    ]);
  },

  /**
   * 简单登录
   * @param {String} passportForBase64
   * @param {Integer} lcid 语言id (中文2052，英文1033，繁体3076)
   * @return {Promise}
   */
  loginBySimplePassport: function (passportForBase64, lcid) {
    lcid = lcid || 2052;

    return this.execute('Kingdee.BOS.WebApi.ServicesStub.AuthService.LoginBySimplePassport', [
      passportForBase64, lcid
    ]);
  },

  /**
   * 简单登录2
   * @param {String} passportForBase64
   * @param {Boolean} isKickOff
   * @param {Integer} lcid 语言id (中文2052，英文1033，繁体3076)
   * @return {Promise}
   */
  loginBySimplePassport2: function (passportForBase64, isKickOff, lcid) {
    lcid = lcid || 2052;

    return this.execute('Kingdee.BOS.WebApi.ServicesStub.AuthService.LoginBySimplePassport2', [
      passportForBase64, isKickOff, lcid
    ]);
  },

  /**
   * 登出
   * @return {Promise}
   */
  logout: function () {
    return this.execute('Kingdee.BOS.WebApi.ServicesStub.AuthService.Logout');
  },

  /**
   * 验证登录
   * @param {String} dbId 账套id
   * @param {String} userName 用户名
   * @param {String} password 密码
   * @param {Integer} lcid 语言id (中文2052，英文1033，繁体3076)
   * @return {Promise}
   */
  validateLogin: function (dbId, userName, password, lcid) {
    return this.execute('Kingdee.BOS.WebApi.ServicesStub.AuthService.ValidateUser', [
      dbId, userName, password, lcid
    ]);
  },

  /**
   * 验证登录2
   * @param {String} dbId 账套id
   * @param {String} userName 用户名
   * @param {String} password 密码
   * @param {String} isKickOff
   * @param {Integer} lcid 语言id (中文2052，英文1033，繁体3076)
   * @return {Promise}
   */
  validateLogin2: function (dbId, userName, password, isKickOff, lcid) {
    return this.execute('Kingdee.BOS.WebApi.ServicesStub.AuthService.ValidateUser2', [
      dbId, userName, password, isKickOff, lcid
    ]);
  }
}

module.exports = ApiClient;