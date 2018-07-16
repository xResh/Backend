const db = require(global.include.db);

var token = function(sql_result){
  return this;
}

exports.create = function(token, user_id, resp){
  values = [token, user_id];
  db.get().query("INSERT INTO tokens (token, user_id) VALUES (?,?)", values, function(err,result){
    if(err){
      resp(err);
      return;
    }
    resp(null);
  });
}
