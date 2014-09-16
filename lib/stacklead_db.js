var pg = require('pg');

module.exports = function (options) {
  if (!options) return null;
  return new StackLeadDb(options);
};

function StackLeadDb (options) {
  if (!(this instanceof StackLeadDb)) return new StackLeadDb(options);
  this.options = options;
  this._init();
}

StackLeadDb.prototype._init = function() {
  pg.connect(this.options, function(err, client, done) {
    if(err) {
      console.log(err);
      console.error('error fetching client from pool', err);
    }
    var query = 'CREATE TABLE IF NOT EXISTS stacklead_results (' +
      'email varchar(255) NOT NULL CHECK (email <> \'\'), ' +
      'created timestamp default now(), ' +
      'data json' +
    ');';
    client.query(query, function(err, result) {
      done();
    });
  });
};

StackLeadDb.prototype.save = function(body, cb) {
  var email = body.data.person.email;
  pg.connect(this.options, function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('INSERT INTO stacklead_results (email, data) VALUES ($1, $2);', [email, body], function(err, result) {
      done();
      cb(err);
    });
  });
};
