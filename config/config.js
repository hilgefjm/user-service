'use strict';

var config = {
  'environment': process.env.NODE_ENV || 'development'
};


// Initialize variables based on the environment
if (config.environment === 'development') {
  var dev = require('./config.json')[config.environment];
  config.applicationURL = dev.application.protocol + '://' + dev.application.uri + ':' + dev.application.port;
  config.port = dev.application.port;
  config.dbConnectionString = 'postgres://' + dev.db.user + ':' + dev.db.password + '@' + dev.db.host + ':' + dev.db.port + '/' + dev.db.database;
  config.dbConnection = {
    user: dev.db.user,
    password: dev.db.password,
    host: dev.db.host,
    database: dev.db.database,
    port: dev.db.port,
    min: dev.db.options.minPool,
    max: dev.db.options.maxPool,
    ssl: dev.db.options.ssl,
    idleTimeoutMillis: dev.db.options.idleTimeoutMillis
  };
} else {
  var env = JSON.parse(process.env.NODE_VARS);
}

module.exports = config;
