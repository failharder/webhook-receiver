var should = require('should');
var config = require('../../_config');
var db = require('../stacklead_db')(config.pg);
var email = require('../email')(config.email);

describe('db test', function () {
  this.timeout(30000);
  it('save', function (done) {
    db.save({
      token: 'lkyp7nyc2hzx',
      data: {
        score: 7,
        person: {
          email: 'test@example.com'
        },
        company: {},
        domain: {}
      }
    }, function(err) {
      console.log(err);
      should(err).not.be.ok;
      done();
    });
  });
});

describe('email test', function () {
  this.timeout(30000);
  it('send', function (done) {
    email.send({
      from: 'stackleadTest@gmail.com',
      to: 'ted@stacklead.com',
      subject: 'Testing email sender'
    }, '<pre>' + JSON.stringify({
      score: 7,
      person: {
        email: 'test@example.com'
      },
      company: {},
      domain: {}
    }, null, 2) + '</pre>', function(err) {
      console.log(err);
      should(err).not.be.ok;
      done();
    });
  });
});