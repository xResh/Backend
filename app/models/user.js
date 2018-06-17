var db = require(global.dbDir);

exports.create = function(username, password, email, screen_name, done){
  var values = [username, password, email, screen_name];
  db.get().query('INSERT INTO users (username, password, email, screen_name) VALUES (?, ?, ?, ?)', values, function(err,result){
    if (err) return done(err);
    done(null, result.insertId);
  });
}

exports.get = function(id, done){
  db.get().query('SELECT * FROM users WHERE id = ?', id, function(err, result){
    if (err) return done(err);
    done(null, result);
  })
}

exports.get_user_by_username = function(username, done){
  db.get().query('SELECT * FROM users WHERE username=?', username, function(err, rows){
    if (err) return done(err);
    done(null,rows);
  });
}
