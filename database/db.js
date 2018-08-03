var mysql = require('mysql');
var async = require('async');

let DEVELOPMENT_DB = "phare_development";

let state = {
  pool: null,
  mode: null
};

exports.connect = function(done){
  state.pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: DEVELOPMENT_DB
  });
  state.mode = 'DEVELOPMENT';
  done();
}

exports.get = function(){
  return state.pool;
}

exports.drop = function(tables, done){
  let pool = state.pool;
  if(!pool) return done(new Error('Missing database connection...'));

  async.each(tables, function(name,cb){
    pool.query("DELETE * FROM " + name, cb);
  }, done);
}
