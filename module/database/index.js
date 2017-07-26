
var mysql = require('mysql');

var conInfo = {
    host : "127.0.0.1",
    user : "root",
    password : "mysql",
    port : "3306",
    database : "bbs"

};

//쿼리 후에 결과값을 리턴해주는 함수
exports.executeQuery = function(query, callback){
  var con = mysql.createConnection(conInfo);
  con.connect();
  con.query(query, function(err, items, fields){
    if(err){
      console.log(err);
    } else {
        callback(items);
    }
    this.end();
  });
}

/*exports.executeQuery = function(query, callback){
  var con = mysql.createConnection(conInfo);
  con.connect();
  con.query(query, function(err, items, fields){
    if(err){
      console.log(err);
    } else {
        callback(items);
    }
    this.end();
  });
}
*/

//검색조건을 받아서 처리하는 함수
exports.executeQueryValues = function(query, values, callback){
  var con = mysql.createConnection(conInfo);
  con.connect();
  con.query(query, values, function(err, items, fields){
    if(err){
      console.log(err);
    } else {
        callback(items);
    }
    this.end();
  });
}

exports.execute = function(query, values, callback){
  var con = mysql.createConnection(conInfo);
  con.connect();
  con.query(query, values, function(err, result){
    if(err){
      //에러처리 : callback에서 에러를 표시함.
      callback(err);
    } else {
      callback();
    }
    this.end();
  });
}

exports.executeMulti = function(query, values, callback){
  console.log("in database executeMulti");
  var con = mysql.createConnection(conInfo);
  con.connect();
  //배열이 3단으로 들어간다고?!
  con.query(query, [[values]], function(err, result){
    console.log("in database executeMulti query");
    if(err){
      console.log(err);
    } else {
      callback();
    }
    this.end();
  });
}
