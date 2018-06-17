var db = require(global.dbDir);

exports.create = function(title, description, created_by, done){
  var values = [title, description, created_by];
  db.get().query("INSERT INTO posts (title, description, created_by) VALUES (?, ?, ?, ?)", values, function(err, result){
    if (err) return done(err);
    done(null, result.insertId);
  });
}

exports.get = function(id, done){
  db.get().query("SELECT * FROM posts WHERE id = ?", id, function(err, result){
    if (err) return done(err);
    done(null, result);
  });
}

exports.get_posts_after = function(timestamp, done){
  db.get().query("SELECT * FROM posts WHERE created_at > ?", timestamp, function(err, result){
    if (err) return done(err);
    done(null, result);
  });
}

exports.get_posts_before = function(timestamp, done){
  db.get().query("SELECT * FROM posts WHERE created_at < ?", timestamp, function(err, result){
    if (err) return done(err);
    done(null, result);
  });
}
