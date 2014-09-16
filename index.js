var async = require('async');
var express = require('express');
var config = require('./config');
var mixpanel = require('./lib/mixpanel')(config.mixpanel);
var db = require('./lib/stacklead_db')(config.pg);
var email = require('./lib/email')(config.email);

var app = express();
app.use(express.bodyParser());

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// create any number of these webhok handlers
app.post('/receive-stacklead', function(req, res) {
  // parse out stacklead webhook response
  var apiResponse = req.body;
  var jobs = [];
  if (db) {
    // save to database
    jobs.push(function(done) {
      db.save(apiResponse, function(err) {
        done();
      });
    });
  }
  if (mixpanel) {
    // send to mixpanel
    jobs.push(function(done) {
      mixpanel.send(req.body, function(err) {
        // noop
        done();
      });
    });
  }
  if (email) {
    // send email
    jobs.push(function(done) {
      email.send({
        from: 'ted@stacklead.com',
        to: 'ted@stacklead.com',
        subject: 'New StackLead Lead - ' + req.body.data.person.email
      }, '<pre>' + JSON.stringify(req.body.data, null, 2) + '</pre>', function(err) {
        done();
      });
    });
  }

  // send
  async.parallel(jobs, function(err, results) {
    res.send(200);
  });
  
});

// start up server ...
app.listen(app.get('port'), function() {
  console.log("Node app is running at port:" + app.get('port'));
});

module.exports = app;