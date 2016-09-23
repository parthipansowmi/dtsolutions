var react = require('react');

exports.addNewCustomer = function (req, res) {
    var data = req.body;
    var db = req.app.locals.db;
    console.log(data);
    console.log('Adding customer: ' + JSON.stringify(data));
    db.collection('customer', function (err, collection) {
        collection.insert(data, { safe: true }, function (err, result) {
            if (err) {
                console.log("Error")
                res.send('fa(lse');
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send('true');
            }
        });
    });
};


exports.deleteCustomer = function (req, res) {
    var email = req.query.email;
    console.log('Deleting customer: ' + email);
     var db = req.app.locals.db;
    db.collection('customer', function (err, collection) {
        collection.remove({"email": email}, { safe: true }, function (err, result) {
            if (err || result == 0) {
                res.send(false);
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(true);
            }
        });
    });

};

    exports.findCustomer = function (req, res) {
    var email = req.query.userEmail;
    
    var status;
    console.log("email: "+email);
    //console.log("customer"+customer);
    var conn = req.app.locals.db;
    conn.collection('customer', function (err, collection) {
        collection.find( {"email": email}).toArray(function (err, items) {
        	if ( err || items.length < 1)
        	{
        		status = false;
        		res.send(status);
        	}
            else
            {
            	status=true;
            	res.send(status);
            }
        });
    });
};