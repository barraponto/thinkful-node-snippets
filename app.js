var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/');

mongoose.connection.on('error', function(error){
  console.error('Could not connect to MongoDB. Error:', error);
});

mongoose.connection.once('open', function(){
  var snippetSchema = mongoose.Schema({
    name: { type: String, unique: true },
    content: { type: String }
  });
  var Snippet = mongoose.model('Snippet', snippetSchema);

  var create = function(name, content) {
    var snippet = {name: name, content: content};
    Snippet.create(snippet, function(error, snippet){
      if (error || !snippet) {
        console.error('Could not create snippet', name);
      } else {
         console.log('Created snippet', snippet.name);
      }
      mongoose.disconnect();
    });
  };

  var read = function(name) {
    var query = {name: name};
    Snippet.findOne(query, function(error, snippet){
      if (error || !snippet) {
        console.error('Could not read snippet', name);
      } else {
         console.log('Read snippet', snippet.name);
         console.log(snippet.content);
      }
      mongoose.disconnect();
    });
  };

  var update = function(name, content) {
    var query = {name: name};
    var data = {content: content};
    Snippet.findOneAndUpdate(query, data, function(error, snippet){
      if (error || !snippet) {
        console.error('Could not update snippet', name);
      } else {
         console.log('Updated snippet', snippet.name);
      }
      mongoose.disconnect();
    });
  };

  var delete_ = function(name) {
    var query = {name: name};
    Snippet.findOneAndRemove(query, function(error, snippet){
      if (error || !snippet) {
        console.error('Could not delete snippet', name);
      } else {
         console.log('Deleted snippet', snippet.name);
      }
      mongoose.disconnect();
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
