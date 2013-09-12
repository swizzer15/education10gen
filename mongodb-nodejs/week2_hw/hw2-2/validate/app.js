var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/weather', function(err, db) 
{
     if(err) throw err;

     var query = {};

     db.collection('data').distinct("State", function (err, doc){

     	doc.forEach(function (state)
     	{
     		db.collection('data').find( { "State" : state } ).sort( {"Temperature": -1} ).limit(1).toArray(function (err, doc) {
		        if(err) throw err;

		        if (doc == null)
		        	return db.close();

		      	db.collection('data').update( { "_id" : doc[0]['_id'] }, { '$set' : {"month_high" : "true"} }, function (err, doc){ 
		      		if(err) throw err;

		      		if (doc == null)
		      			return db.close();

		      		console.log(doc)
		      	})
	        

     		})
     	})
     })
	
     
    
});
