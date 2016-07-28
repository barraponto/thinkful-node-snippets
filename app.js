var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost/', function(error, db){
  if (error) { console.error(error); db.close(); return; }
  var collection = db.collection('snippets');

  var create = function(name, content) {
    var snippet = {name: name, content: content};
    collection.insert(snippet, function(error, result){
      if (error) { console.error(error); db.close(); return; }
      console.log('Created snippet', name);
      db.close();
    });
  };
  var read = function(name) {
    var query = {name: name};
    collection.findOne(query, function(error, snippet){
      if (error || !snippet) { console.error('Could not read snippet ', name); db.close(); return; }
      console.log('Read snippet', name);
      console.log(snippet.content);
      db.close();
    });
  };
  var update = function(name, content) {
    var query = {name: name};
    var update = {$set: {content: content}};
    collection.findAndModify(query, null, update, function(error, result){
      var snippet = result.value;
      if (error || !snippet) { console.error('Could not update snippet ', name); db.close(); return; }
      console.log('Updated snippet', name);
      db.close();
    });
  };
  var delete_ = function(name) {
    var query = {name: name};
    collection.findAndRemove(query, function(error, result){
      var snippet = result.value;
      if (error || !snippet) { console.error('Could not delete snippet ', name); db.close(); return; }
      console.log('Deleted snippet', name);
      db.close();
    });
  };

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
