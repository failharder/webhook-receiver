var defaults = require('defaults');

var privateConfig = null;
try {
  privateConfig = require('./_config');
} catch(e) {
  console.log('Could not load _config');
}

var config = {
  // for db storage module
  pg: {
    database: 'stacklead_heroku', // UPDATE in _config.js
    user: '', // UPDATE in _config.js
    password: '', // UPDATE in _config.js
    host: 'localhost',
    port: 5432,
    ssl: false
  },
  // for pushing data to mixpanel
  mixpanel: {
    token: ''
  },
  // for sending email from data
  email: {
    service: 'Gmail',
    auth: {
      user: 'gmail.user@gmail.com', // UPDATE in _config.js
      pass: '' // UPDATE in _config.js
    }
  }
};

// if running on heroku parse out db url from config.
if (process.env.DATABASE_URL) {
  // "postgres://*USERNAME*:*PASSWORD*@*HOST*:*PORT:/*DATABASE*"
  var parsedConfig = process.env.DATABASE_URL.match(/\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(\S+)/);
  var username = parsedConfig[1];
  var password = parsedConfig[2];
  var host = parsedConfig[3];
  var port = parsedConfig[4];
  var database = parsedConfig[5];

  config.pg = {
    database: database,
    user: username,
    password: password,
    host: host,
    port: port,
    ssl: true
  };
}

// private config is default.
if (privateConfig) {
  config = defaults(privateConfig, config);
}

module.exports = config;