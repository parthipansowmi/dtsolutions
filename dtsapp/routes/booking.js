var react = require('react');
var ObjectId = require('mongodb').ObjectID;


exports.addNewBooking = function (req, res) {
    var data = req.body;
    var db = req.app.locals.db;
    console.log('Adding booking: ' + JSON.stringify(data));
    db.collection('booking', function (err, collection) {
        collection.insert(data, { safe: true }, function (err, result) {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
};


exports.deleteBooking = function (req, res) {
    var email = req.query.email;
    console.log('Deleting booking: ' + email);
     var db = req.app.locals.db;
    db.collection('booking', function (err, collection) {
        
            collection.remove({"email": email}, { safe: true }, function (err, result) {
            console.log("Error: "+err);
            console.log("Result: "+result);
            if (result == 0 || err ) {
                res.send(false);                             
               
            } else {
                console.log(result.length + ' document(s) deleted');
                res.send(true);    
            }
        });
           
    });

}

    exports.findBooking = function (req, res) {
    var email = req.query.email;
    var status;
    console.log("email: "+email);
    var conn = req.app.locals.db;
    //console.log(conn);
    conn.collection('booking', function (err, collection) {
        console.log("Error"+err);
        collection.find({"email": email}).toArray(function (err, items) {
            console.log("Booking Record: "+items.length);
        	if ( err || items.length == 0 )
        	{
        		status = false;
        		res.send(items);
        	}
            else
            {
            	console.log()
            	res.send(items);
            }
        });
    });
}

exports.cancelBooking = function (req, res) {
    var email = req.query.email;
    var id = req.query.id;
    var status;
    console.log("id: "+id);
    var conn = req.app.locals.db;
    var ObjectId = require('mongodb').ObjectID;
    //console.log(conn);
    conn.collection('booking', function (err, collection) {
        console.log("Error"+err);
        collection.findAndModify( { "_id" :  ObjectId(id)}, [['_id','asc']], {$set:  { "status" : "cancel" }},  function (err, result) {
            console.log("Booking Record: "+result);
            console.log("Error: "+err)
            if ( err  )
            {
                status = false;
                res.send(status);
            }
            else
            {
                status = true;
                res.send(status);
            }
        });
    });
}

exports.changeBookingDate = function (req, res) {
    var date = req.query.date;
    var id = req.query.id;
    console.log("Id: "+id)
    var status;
    console.log("Date: "+date);
    var conn = req.app.locals.db;
    //console.log(conn);
   conn.collection('booking', function (err, collection) {
        console.log("Error"+err);
        collection.findAndModify( { "_id" :  ObjectId(id)}, [['_id','asc']], {$set:  { "functiondate" : date }},  function (err, result) {
            console.log("Booking Record: "+result);
            console.log("Error: "+err)
            if ( err  )
            {
                status = false;
                res.send(status);
            }
            else
            {
                status = true;
                res.send(status);
            }
        });
    });
}

exports.updateProviderLink = function (req, res) {
    var custemail = req.query.email;
    var provideremail = req.query.provideremail;
    console.log("Customer E-mail: "+custemail);
    console.log("Provider E-mail:"+provideremail);
    var conn = req.app.locals.db;
    //var ObjectId = require('mongodb').ObjectID;
    //console.log(conn);
    conn.collection('booking', function (err, collection) {
        console.log("Error"+err);
        collection.findAndModify( { "email" :  custemail }, [['_id','asc']], {$set:  { "provideremail" : provideremail }}, {new: true, upsert: true},  function (err, result) {
            //console.log("Booking Record: "+result);
            //console.log("Error: "+err)
            if ( err  )
            {
                status = false;
                res.send(status);
            }
            else
            {
                status = true;
                res.send(status);
            }
        });
    });
}
