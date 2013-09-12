var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/school', function(err, db) 
{
     if(err) throw err;

     var query = {};

     db.collection('students').find({}, { "scores" : { "$slice" : [ 2, 3 ] } }).toArray(function (err, doc){

     	var lScore = [];
     	for(var x = 0; x < doc.length; x++){
            
			if (doc[x]['scores'][0].score < doc[x]['scores'][1].score)
			     lScore.push([doc[x]['_id'], doc[x]['scores'][0].score])
			else
			   	lScore.push([doc[x]['_id'], doc[x]['scores'][1].score])
     	}
        
        for(var y = 0; y < lScore.length; y++){
           
        	db.collection('students').update({"_id" : lScore[y][0]}, {$pull : {"scores" : {score: lScore[y][1] } } }, function (err, doc){
                
        		console.log('Succes')
        	})


        }
     	
     	

     })
	
    
    
});
