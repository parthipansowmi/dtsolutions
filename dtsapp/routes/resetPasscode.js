var react = require('react');

exports.storePasscode = function (req, res) {
    var data = req.body;
    var db = req.app.locals.db;
    console.log('Adding passResetCode: ' + JSON.stringify(data));
    db.collection('passResetCode', function (err, collection) {
        collection.insert(data, { safe: true }, function (err, result) {
            if (err) {
                res.send('false');
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send('true');
            }
        });
    });
};


exports.deletePasscode = function (req, res) {
    var id = req.query.code;
    console.log('Deleting passResetCode: ' + id);
    var db = req.app.locals.db;
    db.collection('passResetCode', function (err, collection) {
        collection.remove({'code': id}, { safe: true }, function (err, result) {
            if (result == 0) {
                res.send(false);
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(true);
            }
        });
    });

};

    exports.find = function (req, res) {
    var email = req.query.userEmail;
    var passResetCode = req.query.code;
    var status;
    console.log("email: "+email);
    console.log("passResetCode"+passResetCode);
    var conn = req.app.locals.db;
    conn.collection('passResetCode', function (err, collection) {
        collection.find( {"email": email, "code": passResetCode}).toArray(function (err, items) {
        	if ( err || items.length == 0)
        	{
        		status = 'false';
        		res.send(status);
        	}
            else
            {
            	status='true';
            	res.send(status);
            }
        });
    });
};