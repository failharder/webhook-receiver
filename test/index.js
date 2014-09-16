var request = require('supertest');
var app = require('../');

describe('POST /receive-stacklead', function(){
  it('send email and save to db', function(done){
    this.timeout(5000);
    request(app)
      .post('/receive-stacklead')
      .set('content-type', 'application/json')
      .set('accept', 'application/json')
      .send({
        token: 'lkyp7nyc2hzx',
        data: {
          score: 7,
          person: {
            email: 'test@example.com'
          },
          company: {},
          domain: {}
        }
      })
      .expect(200)
      .end(function(err, res){
        if (err) return done(err);
        // verify db...
        done();
      });
  });
});
