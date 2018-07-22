const db = require(global.include.db);
const uuid4 = require('uuid/v4');
const async = require('asyncawait/async');
const await = require('asyncawait/await');

var token = function(sql_result){
  this.token = sql_result.token;
  return this;
}

var create = function(user){
  let auth_token = uuid4();
  return new Promise(function(resolve, reject){
    values = [auth_token, user.id];
    db.get().query("INSERT INTO auth_tokens (token, user_id) VALUES (?,?)", values, function(err,result){
      if(err) reject(err);
      resolve(get_by_auth_token(auth_token));
    });
  });
}

var get_by_auth_token = function(auth_token){
  return new Promise(function(resolve, reject){
    values = [auth_token];
    db.get().query("SELECT * FROM auth_tokens WHERE token=?", values, function(err, result){
      if(err) reject(err);
      resolve(token(result[0]));
    })
  });
}

module.exports = {
  create: create
};
