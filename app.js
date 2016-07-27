var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost/', function(error, db){
  if (error) { console.error(error); db.close(); return; }
  var collection = db.collection('snippets');

  var create = function(name, content) { db.close(); };
  var read = function(name) { db.close(); };
  var update = function(name, content) { db.close(); };
  var delete_ = function(name) { db.close(); };

  var main = function(){
    var command = process.argv[2];
    if (command == 'create'){ create(process.argv[3], process.argv[4]); }
    else if (command == 'read'){ read(process.argv[3]); }
    else if (command == 'update'){ update(process.argv[3], process.argv[4]); }
    else if (command == 'delete'){ delete_(process.argv[3]); }
    else {
      console.error('Command not recognized.');
      db.close();
    }
  };

  main();

});
