var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/school', function(err, db) {
    if(err) throw err;
    var cursor = db.collection('students').find();
    
    cursor.each(function(err, doc) {
      if(err) throw err;

      if (doc) {
        var indexHw = -1;
        for (var i = 0; i < doc.scores.length; i++) {
          
          var score = doc.scores[i];

          if (doc.scores[i]['type'] === 'homework' && indexHw == -1) {
            indexHw = i;
          }
          else if (score.type === 'homework' && score.score > doc.scores[indexHw].score) {
            doc.scores[indexHw].score = score.score;
          }
        };
        doc.scores.pop();

        db.collection('students').update({'_id': doc['_id']}, {'$set':{'scores': doc.scores}}, function(err, updated) {
            if(err) throw err;
        });
      }

    });
});
