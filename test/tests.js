var server = require('../lib/server.js');
var request = require('request');
var assert = require('chai').assert;

describe('server response', function () {
     before(function () {
          server.init(3000);
     });

     after(function () {
          server.close();
     });

     it('should return 404', function (done) {
          request.get('http://localhost:3000', function (err, res, body){
                    assert.equal(res.statusCode,404);
                    assert.equal(err,null);
                    assert.equal(body,'{}');
                    done();
          });
     });

     it('should return 404', function (done) {
          request.get('http://localhost:3000/blah', function (err, res, body){
                    assert.equal(res.statusCode,404);
                    assert.equal(err,null);
                    assert.equal(body,'{}');
                    done();
          });
     });

     it('should return 200 with object and welcome message within body', function (done) {
          request.get('http://localhost:3000/hello', function (err, res, body){
                    body = JSON.parse(body);
                    assert.equal(res.statusCode,200);
                    assert.equal(err,null);
                    assert.deepEqual(body,{'message':'Hello World. This is my homework'});
                    done();
          });
     });
});