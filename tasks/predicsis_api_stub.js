/*
 * grunt-predicsis-api-stub
 * https://github.com/yllieth/grunt-predicsis-api-stub
 *
 * Copyright (c) 2015 Sylvain
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  function stubApi(port, keepalive) {
    var api = require('../bower_components/predicsis_ml_stub-nodejs/src/stubbed-api.js');
    api.listen(port);
    keepalive();
  }

  function stubS3(port, keepalive) {
    var s3 = require('../bower_components/predicsis_ml_stub-nodejs/src/stubbed-s3.js');
    s3.listen(port);
    keepalive();
  }

  function stubIdentity(port, keepalive) {
    var identity = require('../bower_components/predicsis_ml_stub-nodejs/src/stubbed-identity.js');
    identity.listen(port);
    keepalive();
  }

  function stubIdproxy(port, keepalive) {
    var idProxy = require('../bower_components/predicsis_ml_stub-nodejs/src/stubbed-idproxy.js');
    idProxy.listen(port);
    keepalive();
  }

  grunt.registerMultiTask('predicsis_api_stub', 'Grunt plugin to easily run stub server of PredicSis API', function() {
    var ports = this.data;

    stubS3(ports.s3, this.async);
    stubApi(ports.api, this.async);
    stubIdentity(ports.idproxy, this.async);
    stubIdproxy(ports.oauth, this.async);
  });
};
