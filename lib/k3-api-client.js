/**
 * A client for the web api of Kingdee BOS.
 */
"use strict";

var _ = require('lodash'),
  contract = require('./contract'),
  ApiClient = require('./api-client');

contract.debug = true;

/**
 * Constructor for the K3CloudApiClient.
 * @param {String} serverUrl
 */
var K3CloudApiClient = function (serverUrl) {
  contract(arguments)
    .params('string')
    .end();

  this._client = new ApiClient(serverUrl);
}

K3CloudApiClient.prototype = {
  /**
   *
   * @param {String} formid 业务对象表单Id
   * @param {Object} data 业务数据
   * @return {Promise}
   */
  allocate: function (formid, data) {
    contract(arguments)
      .params('string', 'object')
      .end();

    return this._client.execute('Kingdee.BOS.WebApi.ServicesStub.DynamicFormService.Allocate', [formid, data]);
  },

  /**
   * 执行审核操作
   * @param {String} formid 业务对象表单Id
   * @param {Object} data 业务数据
   * @return {Promise}
   */
  audit: function (formid, data) {
    contract(arguments)
      .params('string', 'object')
      .end();

    return this._client.execute('Kingdee.BOS.WebApi.ServicesStub.DynamicFormService.Audit', [formid, data]);
  },

  /**
   * 执行批量保存操作
   * @param {String} formid 业务对象表单Id
   * @param {Object} data 业务数据
   * @return {Promise}
   */
    batchSave: function (formid, data) {
      contract(arguments)
      .params('string', 'object')
      .end();

    return this._client.execute('Kingdee.BOS.WebApi.ServicesStub.DynamicFormService.BatchSave', [formid, data]);
  },

  /**
   * 执行删除操作
   * @param {String} formid 业务对象表单Id
   * @param {Object} data 业务数据
   * @return {Promise}
   */
  delete: function (formid, data) {
    contract(arguments)
    .params('string', 'object')
    .end();

    return this._client.execute('Kingdee.BOS.WebApi.ServicesStub.DynamicFormService.Delete', [formid, data]);
  },

  /**
   * 执行暂存操作
   * @param {String} formid 业务对象表单Id
   * @param {Object} data 业务数据
   * @return {Promise}
   */
  draft: function (formid, data) {
    contract(arguments)
    .params('string', 'object')
    .end();

    return this._client.execute('Kingdee.BOS.WebApi.ServicesStub.DynamicFormService.Draft', [formid, data]);
  },

  /**
   * 执行单据查询操作
   * @param {Object} data 业务数据
   * @return {Promise}
   */
  executeBillQuery: function (data) {
    contract(arguments)
    .params('object')
    .end();

    return this._client.execute('Kingdee.BOS.WebApi.ServicesStub.DynamicFormService.ExecuteBillQuery', [data]);
  },

  /**
   * 执行特定操作（如：SAL_OUTSTOCK、）
   * @param {String} formid
   * @param {String} opNumber
   * @param {Object} data 业务数据
   * @return {Promise}
   */
  executeOperation: function (formid, opNumber, data) {
    contract(arguments)
    .params('string', 'string', 'object')
    .end();

    return this._client.execute('Kingdee.BOS.WebApi.ServicesStub.DynamicFormService.ExcuteOperation', [formid, opNumber, data]);
  },

  /**
   *
   * @param {String} formid 业务对象表单Id
   * @param {Object} data 业务数据
   * @return {Promise}
   */
  flexSave: function (formid, data) {
    contract(arguments)
    .params('string', 'object')
    .end();

    return this._client.execute('Kingdee.BOS.WebApi.ServicesStub.DynamicFormService.FlexSave', [formid, data]);
  },

  /**
   * 获取所有数据中心信息
   * @return {Promise}
   */
  getDataCenter: function () {
    return this._client.execute('Kingdee.BOS.ServiceFacade.ServicesStub.Account.AccountService.GetDataCenterList');
  },

  /**
   * 执行登录操作
   * @return {Promise}
   */
  login: function () {
    contract(arguments)
    .params('string', 'number')
    .params('string', 'boolean', 'number')
    .params('string', 'string', 'string', 'number')
    .params('string', 'string', 'string', 'string', 'number')
    .params('string', 'string', 'string', 'string', 'boolean', 'number')
    .params('string', 'string', 'string', 'string', 'string', 'number')
    .params('string', 'string', 'string', 'string', 'string', 'boolean', 'number')
    .end();

    switch (arguments.length) {
      case 2:
        return this._client.loginBySimplePassport.apply(this._client, arguments);
      case 3:
        return this._client.loginBySimplePassport2.apply(this._client, arguments);
      case 4:
        return this._client.login.apply(this._client, arguments);
      case 5:
        return this._client.loginByAppSecret.apply(this._client, arguments);
      case 6:
        return (typeof arguments[4] == 'boolean') ? this._client.loginByAppSecret2.apply(this._client, arguments) : this._client.loginBySign.apply(this._client, arguments)
      case 7:
        return this._client.loginBySign2.apply(this._client, arguments);
    }
  },

  /**
   * 执行登出操作
   * @return {Boolean}
   */
  logout: function () {
    return this._client.logout();
  },

  /**
   * 执行保存操作
   * @param {String} formid 业务对象表单Id
   * @param {Object} data 业务数据
   * @return {Promise}
   */
  save: function (formid, data) {
    contract(arguments)
    .params('string', 'object')
    .end();

    return this._client.execute('Kingdee.BOS.WebApi.ServicesStub.DynamicFormService.Save', [formid, data]);
  },

  /**
   * 执行发送消息操作
   * @param {Object} data 业务数据
   * @return {Promise}
   */
  sendMsg: function (data) {
    contract(arguments)
    .params('object')
    .end();

    return this._client.execute('Kingdee.BOS.WebApi.ServicesStub.DynamicFormService.SendMsg', [data]);
  },

  /**
   * 执行状态转换操作
   * @param {Object} data
   * @return {Promise}
   */
  stateConvert: function (data) {
    contract(arguments)
    .params('object')
    .end();

    return this._client.execute('Kingdee.BOS.WebApi.ServicesStub.DynamicFormService.StatusConvert', [data]);
  },

  /**
   * 执行提交操作
   * @param {String} formid 业务对象表单Id
   * @param {Object} data 业务数据
   * @return {Promise}
   */
  submit: function (formid, data) {
    contract(arguments)
    .params('string', 'object')
    .end();

    return this._client.execute('Kingdee.BOS.WebApi.ServicesStub.DynamicFormService.Submit', [formid, data]);
  },

  /**
   * 执行反审核操作
   * @param {String} formid 业务对象表单Id
   * @param {Object} data 业务数据
   * @return {Promise}
   */
  unAudit: function (formid, data) {
    contract(arguments)
    .params('string', 'object')
    .end();

    return this._client.execute('Kingdee.BOS.WebApi.ServicesStub.DynamicFormService.UnAudit', [formid, data]);
  },

  /**
   * 执行查看操作
   * @param {String} formid 业务对象表单Id
   * @param {Object} data 业务数据
   * @return {Promise}
   */
  view: function (formid, data) {
    contract(arguments)
    .params('string', 'object')
    .end();

    return this._client.execute('Kingdee.BOS.WebApi.ServicesStub.DynamicFormService.View', [formid, data]);
  },
}

module.exports = K3CloudApiClient;