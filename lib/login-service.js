'use strict';

var pg = require('pg').native;
var Pool = pg.Pool;
var properties = require('./properties-reader');
var config = require('../config/config.js');
var logger = require('./logger');

var pool = new Pool(config.dbConnection);

pool.on('error', function (err) {
  // if an error is encountered by a client while it sits idle in the pool
  // the pool itself will emit an error event with both the error and
  // the client which emitted the original error
  // this is a rare occurrence but can happen if there is a network partition
  // between your application and the database, the database restarts, etc.
  // and so you might want to handle it and at least log it out
  logger.error('idle client error', err.message, err.stack);
});

function query (statement, binds, callback) {
  if (typeof binds === 'function') {
    callback = binds;
    binds = null;
  }

  pool.connect((err, client, done) => {
    if (err) {
      logger.error('Error connecting to postgres');
      return callback(err);
    }

    logger.info('Querying postgres:');
    logger.info(statement);
    client.query(statement, binds, (err, results) => {
      done();

      if (err) {
        logger.error('Error querying to postgres');
        return callback(err);
      }

      callback(null, results);
    });
  });
}

function RegisterUser (userName, password, email, callback) {
  let algorithm = properties.get('login.encrpytionAlgorithm.blowfish');
  let binds = [userName, email, password, algorithm];
  let statement = properties.get('login.sql.register');
  query(statement, binds, function (err, results) {
    if(err) return callback(err);

    callback(null, results);
  });
}

function Authenticate (userName, password, callback) {
  let binds = [password, userName];
  let statement = properties.get('login.sql.authenticate');
  query(statement, binds, function (err, results) {
    if (err) return callback(err);

    callback(null, results);
  });
}

module.exports = {
  'register': RegisterUser,
  'authenticate': Authenticate
};
