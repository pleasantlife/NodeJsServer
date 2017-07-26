var dao = require("../c_dao/bbsDao");
var error = require("../error");
//string을 잘라내는 기본 모듈.
var querystring = require("querystring");


//"GET"
exports.read = function(qs, response){
  console.log("in bbs read");
  console.log(qs);
  if(qs == ""){
    console.log("read all data");
  //dao를 통해 database를 읽고 난 후 결과셋을 처리하는 코드 작성
  dao.select(function(data){
    //데이터를 받아서 JSON으로 변환
    var jsonString = JSON.stringify(data);
    send(response, jsonString);
  });
  } else { //검색을 위한 쿼리스트링이 있으면 쿼리스트링을 분해해서 처리한다.
  //(첫번째 : 키와 값 사이를 구분하는 구분자)
  //(두번째 : 변수와 값 사이를 구분하는 구분자)
    console.log("read certain data");
    var parsedQs = querystring.parse(qs, '&', '=');
    //parsedQs = {
    //  title : "제목",
    //  author : "홍길동"
    //  }
    dao.search(parsedQs, function(data){
      var jsonString = JSON.stringify(data);
      send(response, jsonString);
    });
  } 
}

exports.write = function(request, response){
  console.log("in bbs write");
  //데이터 꺼내기(어디서?)
  var postdata = "";
  request.on('data', function(data){
    postdata = postdata + data;
  });
  request.on('end', function(){
    var dataObj = JSON.parse(postdata);
    dao.insert(dataObj, function(){
      send(response, '{"result":"ok"}');
    });
  });
}

//"PUT"
//update는 write와 동작방식이 유사함.
exports.update = function(request, response){
   console.log("in bbs update");
  //데이터 꺼내기(어디서?)
  var postdata = "";
  request.on('data', function(data){  //데이터가 버퍼에 가득차면 자동으로 호출
    postdata = postdata + data;
  });
  request.on('end', function(){ //데이터를 다 읽었을 때 호출
    var dataObj = JSON.parse(postdata);
    /* 데이터는 이런식으로 들어가겠죠.
    dataObj = {
      	id : 10,
      	title :"수정된제목",
  	    content :"수정된 내용 내용 \n 내용내용내용",
	      author :"펀치넬로",
	      date : "2017-07-24 00:00:00"
    }
    */  
    dao.update(dataObj, function(err){
      if(err){
          error.send(response, 500, err);
      } else {
        send(response, '{"result":"ok"}');
      }
    });
  });
}

//"DELETE"
exports.delete = function(request, response){
    console.log("in bbs delete");
  //데이터 꺼내기
  var postdata = "";
  request.on('data', function(data){  //데이터가 버퍼에 가득차면 자동으로 호출
    postdata = postdata + data;
  });
  request.on('end', function(){ //데이터를 다 읽었을 때 호출
    var dataObj = JSON.parse(postdata);
    dao.delete(dataObj, function(err){
      if(err){
          error.send(response, 500, err);
      } else {
        send(response, '{"result":"ok"}');
      }
    });
  });
}


function send(response, result){
  response.writeHead(200, {'Content-Type':'application/json;charset=utf-8'});
  response.end(result);
}
