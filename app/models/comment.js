var db = require(global.dbDir);

exports.create = function(comment, post_id, user_id, done){
  var values = [comment, post_id, user_id];
  db.get().query("INSERT INTO comments (comment, post_id, user_id) VALUES (?, ?, ?, ?)", values, function(err, result){
    if (err) return done(err);
    done(null, result.insertId);
  });
}

exports.get = function(id, done){
  db.get().query("SELECT * FROM comments WHERE id = ?", id, function(err, result){
    if (err) return done(err);
    done(null, result);
  });
}
