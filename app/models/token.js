const db = require(global.include.db);
const uuid4 = require('uuid/v4');

var token = function(sql_result){
  this.id = sql_result.id;
  return this;
}

var create = function(user){
  return new Promise(function(resolve, reject){
    let auth_token = uuid4();
    values = [auth_token, user.id];
    db.get().query("INSERT INTO tokens (token, user_id) VALUES (?,?)", values, function(err,result){
      if(err) reject(err);
      get_by_id(result.insertId)
        .then(resolve)
        .catch(reject);
    });
  });
}

var get_by_id = function(id){
  return new Promise(function(resolve, reject){
    values = [id];
    db.get().query("SELECT * FROM tokens WHERE id=?", values, function(err, result){
      if(err) reject(err);
      resolve(token(result[0]));
    })
  });
}

module.exports = {
  create: create,
  get_by_id: get_by_id
};
