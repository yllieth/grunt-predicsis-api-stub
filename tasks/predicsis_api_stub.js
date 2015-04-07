/*
 * grunt-predicsis-api-stub
 * https://github.com/yllieth/grunt-predicsis-api-stub
 *
 * Copyright (c) 2015 Sylvain
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  function stubApi(endpoint, keepalive) {
    var api = require('../bower_components/predicsis_ml_stub-nodejs/src/stubbed-api.js');
    api.listen(endpoint.port);
    keepalive();
  }

  function stubS3(endpoint, keepalive) {
    var s3 = require('../bower_components/predicsis_ml_stub-nodejs/src/stubbed-s3.js');
    s3.listen(endpoint.port);
    keepalive();
  }

  function stubIdentity(endpoint, keepalive) {
    var identity = require('../bower_components/predicsis_ml_stub-nodejs/src/stubbed-identity.js');
    identity.listen(endpoint.port);
    keepalive();
  }

  function stubIdproxy(endpoint, keepalive) {
    var idProxy = require('../bower_components/predicsis_ml_stub-nodejs/src/stubbed-idproxy.js');
    idProxy.listen(endpoint.port);
    keepalive();
  }

  grunt.registerMultiTask('predicsis_api_stub', 'Grunt plugin to easily run stub server of PredicSis API', function() {
    var endpoints = this.data;
    var headers = this.options().headers;

    process.env.PREDICSIS_STUBAPI_ORIGINS = headers['Access-Control-Allow-Origin'];
    process.env.PREDICSIS_STUBAPI_METHODS = headers['Access-Control-Allow-Methods'];
    process.env.PREDICSIS_STUBAPI_HEADERS = headers['Access-Control-Allow-Headers'];
    process.env.PREDICSIS_STUBAPI_CREDENTIALS = headers['Access-Control-Allow-Credentials'];

    stubS3(endpoints.s3, this.async);
    stubApi(endpoints.api, this.async);
    stubIdproxy(endpoints.identity, this.async);
    stubIdentity(endpoints.oauth, this.async);
  });
};
