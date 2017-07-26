var database = require("../module/database");
var tableName = "board";

//bbs.js에서 코드를 만들어서 넘겨줌.
//order by id desc : id 역순으로 정렬(id값이 높은 순서부터 나열됨.)
exports.select = function(callback){
  var query = "select * from "+tableName+" order by id desc";
  //executeQuery라는 별도의 함수를 만들어두었음.
  database.executeQuery(query, callback);
}


exports.insert = function(data, callback){
  console.log("in bbsDao insert");

  var query = " insert into "+tableName+"(title,content,author,date)";
      query = query + " values(?,?,?,?)";
      var values = [data.title, data.content, data.author, data.date];
      console.log(query.toString());
  database.execute(query, values, callback);
}


/*
exports.insert = function(data, callback){
  console.log("in bbsDao insert");

  var query = " insert into "+tableName+"(title,content,author,date)";
      query = query + " VALUES ?";
      var values = [data.title, data.content, data.author, data.date];
      console.log(query.toString());
  database.executeMulti(query, values, callback);
}
*/

exports.update = function(data, callback){
 // var query = " update "+tableName+" set title=?, content=?, author=?, date=?, where id=?";
    
  var query = " update " + tableName
                +" set title  =? , "
                +"     content=? , "
                +"     author =? , "
                +"     date   =?  "
                +" where id=?";
    console.log(query.toString());
    //현재 날짜 집어넣기          
    var now = new Date().toLocaleDateString();
    var values = [data.title, data.content, data.author, now, data.id];            
   
  database.execute(query, values, function(err){
      callback(err);
  });
}

//삭제 시 : id값만 알면 모두 삭제할 수 있음.
exports.delete = function(data, callback){
  var query = "delete from "+tableName+" where id=? ";
  var values = [data.id];
  database.execute(query, values, function(err){
    callback(err);
  });
}


exports.search = function(qs, callback){
     var query = "select * from "+tableName+" where title like ?";
     var values = ["%" + qs.title + "%"];
     console.log(query);
     database.executeQueryValues(query, values, callback);
}
    

/*
exports.search = function(qs, callback){
  var query = "select * from "+tableName+" where title like '%"+qs.title+"%' ";
  database.executeQuery(query, callback);
}
*/
