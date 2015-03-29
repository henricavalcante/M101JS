var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/weather', function(err, db) {
    if(err) throw err;
    var cursor = db.collection('data').find().sort({"State": 1, "Temperature": -1}),
    actualState;

    cursor.each(function(err, doc) {
        if(err) throw err;

        if (doc && doc.State != actualState) {
            actualState = doc.State;
            db.collection('data').update({'_id': doc['_id']}, {'$set':{'month_high': true}}, function(err, updated) {
                if(err) throw err;
            });
        }

        
    });
});
