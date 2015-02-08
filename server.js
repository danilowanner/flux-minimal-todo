var express = require('express');
var expressState = require('express-state');

var server = express();
expressState.extend(server);

server.use('/', express.static('./'));
server.get('*', function(req, res) {
  
  var Application = require('./public/app.js');
  
  res.expose(Application.dehydrateStores(), 'AppState');
  var html = Application.start(res.locals.state);
  
  res.send(html);
});
server.listen(8000);

console.log('Server started on port %s', 8000);
