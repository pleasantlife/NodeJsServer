var http = require('http');
var bbs = require('../b_controller/bbs');
var user = require('../b_controller/user');


exports.parse = function(request, response){
  console.log("in router parse");
  var path = removeQueryString(request.url);
  if(path == "/bbs"){
    parseMethod(bbs, request, response);
  } else if (path == "/user"){
    parseMethod(user, request, response);
  } else {
    error.send(response, 404);
  }
}




  /**
  //CRUD의 C (Create)
  if(request.method == "POST"){
    console.log("POST");
    response.writeHead(200, {'Content-Type':'text/html'});
    response.end("POST CREATE");
  } else if (request.method == "GET"){
    console.log("GET");
    response.writeHead(200, {'Content-Type':'text/html'});
    response.end("GET CREATE");
  } else if (request.method == "PUT"){
    console.log("PUT");
    response.writeHead(200, {'Content-Type':'text/html'});
    response.end("PUT CREATE");
  } else if (request.method == "DELETE"){
    console.log("DELETE");
    response.writeHead(200, {'Content-Type':'text/html'});
    response.end("DELETE CREATE");
  }
  */




function parseMethod(module, request, response){
  console.log("in router parseMethod");
  if(request.method == "POST"){
    //bbs.js 파일에 작성한 write() 함수로 보냄.
    module.write(request, response);
  } if(request.method == "GET"){
    module.read(getQueryString(request.url), response);

  } if(request.method == "PUT"){
    module.update(request, response);
  } if (request.method == "DELETE"){
    module.delete(request, response);
  }
}



function removeQueryString(fullUrl){

  var position = fullUrl.indexOf('?');
  if(position == -1){
    return fullUrl;
  } else {
    return fullUrl.substring(0, position);
  }
}


function getQueryString(fullUrl){

  var position = fullUrl.indexOf('?');
  if(position == -1){
    return "";
  } else {
    //substring에 인자를 하나만 주면 출발점~끝까지 잘라옴.
    //position부터 가져오게 하면 ?까지 가져옴.
    return fullUrl.substring(position+1);
  }
}

