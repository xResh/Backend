const db = require(global.include.db);
const uuid4 = require('uuid/v4');

var token = function(sql_result){
  return this;
}

exports.create = function(user_id, resp){
  let auth_token = uuid4();
  values = [auth_token, user_id];
  db.get().query("INSERT INTO tokens (token, user_id) VALUES (?,?)", values, function(err,result){
    if(err){
      resp(err);
      return;
    }
    resp(null, auth_token);
  });
}
