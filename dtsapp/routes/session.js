var request = require('request');

exports.generateSessionId = function generateSessionId(req, res) {
  var crypto = require('crypto');
  var sessionid;

var generate_key = function() {
    var sha = crypto.createHash('sha256');
    sha.update(Math.random().toString());
    sessionid sha.digest('hex');
    console.log("Session ID: "+sessionid);
};
  res.send(sessionid) ;
}