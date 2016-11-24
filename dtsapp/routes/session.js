var request = require('request');

exports.generateSessionId = function generateSessionId(req, res) {
  var crypto = require('crypto');
  var sessionid;
  var sha = crypto.createHash('sha256');
  sha.update(Math.random().toString());
  sessionid = sha.digest('hex');
  console.log("Session ID: "+sessionid);
    /*var time = +(new Date().getTime().toString().substring(3));
var id = Math.abs(time + getNavigationTime() - reduceMiscSessionMetrics()).toString(32);
id += random().toString(32);*/
  res.send(sessionid) ;
}

exports.addSession = function (req, res) {
	var sessionData = req.body;
    console.log('Adding Session Data ' + JSON.stringify(sessionData));
    var db = req.app.locals.db;
    db.collection('session', function (err, collection) {
        collection.insert(sessionData, { safe: true }, function (err, result) {
            if (err) {
                res.send('false');
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send('true');
            }
        });
    });
}

exports.deleteSession = function (req, res) {
    var sessionid = req.query.sessionid;
    console.log('Deleting Session: ' + sessionid);
     var db = req.app.locals.db;
    db.collection('session', function (err, collection) {
        collection.remove({"sessionid": sessionid}, { safe: true }, function (err, result) {
            if (err || result == 0) {
                res.send(false);
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(true);
            }
        });
    });
}
