var http = require('http');
var router = require('./a_router/router');

var server = http.createServer(function (request, response){
  console.log("in Server");
  router.parse(request, response);

  //response.writeHead(200, {'Content-Type':'text/html'});
  //response.end("Hello World");

});

server.listen(4567, function(){
  console.log("server is running...");
});
