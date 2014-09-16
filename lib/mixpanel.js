var MixpanelClientFactory = require('mixpanel');
var flatnest = require('flatnest');

module.exports = function (options) {
  if (!options || !options.token) return null;
  return new Mixpanel(options);
};

function Mixpanel (options) {
  if (!(this instanceof Mixpanel)) return new Mixpanel(options);
  this.options = options;
  this.mixpanel = MixpanelClientFactory(this.options.token);
}

Mixpanel.prototype.send = function(body, cb) {
  var email = body.data.person.email;
  this.mixpanel.people.set(email, remap(body.data, {
    '$name': 'person.name',
    'twitter_followers': 'person.twitter.followers',
    'linkedin_connections': 'person.linkedin.connections',
    'age': 'person.age',
    'location': 'person.location',
    'house_type': 'person.housing.home_type',
    'rent_estimate': 'person.housing.rent_estimate',
    'zestimate': 'person.housing.home_estimate',
    'company': 'company.name',
    'company_location': 'company.location',
    'industry': 'company.industry',
    'funding': 'company.funding',
    'job_title': 'person.job_title',
    'duration': 'person.duration',
    'salary': 'person.salary'
  }));
  cb();
};

function remap(obj, keysObj) {
  var r = {};
  Object.keys(keysObj).forEach(function(k) {
    var v = flatnest.seek(obj, keysObj[k]);
    if (v) {
      flatnest.replace(r, k, v, true);
    }
  });
  return r;
}
