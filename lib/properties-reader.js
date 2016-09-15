'use strict';
var parser = require('properties-parser');
var logger = require('./logger');

const file = './config/.properties';

function getProperty (name, callback) {
  parser.read(file, (err, result) => {
    if (err) {
      logger.error('Error opening properties file', {err});
      return callback(err);
    }

    return callback(null, result[name]);
  });
}

function setProperty (name, value, callback) {
  if (name && typeof name === 'string' && value && typeof value === 'string') {
    parser.createEditor(file, (err, editor) => {
      if (err) {
        logger.error('Error opening properties file', {err});
        return callback(err);
      }

      editor.set(name, value);
      editor.save(file, (err) => {
        if (err) return callback(err);
      });
      return callback(null);
    });
  }
  else return callback(new Error('Name or Value of property is undefined'));
}

module.exports = {
  'get': getProperty,
  'set': setProperty
};
