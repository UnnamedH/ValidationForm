var server1 = require('http').createServer();
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({server:server1}, function(){console.log("success");});


wss.on('connection', function() {
  console.log("success");
});

server1.listen(3000);