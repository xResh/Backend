const db = require(global.include.db);
const timestamp = require(global.include.helper.timestamp);

var user = function(sql_result){
	//user class definition
	this.id = sql_result['id'];
	this.first_name = sql_result['first_name'];
	this.last_name = sql_result['last_name'];
	this.created_at = timestamp.timestamp_to_date(sql_result['created_date']);
}

exports.create = function(first_name, last_name, resp){
	values = [first_name, last_name];
	db.get().query('INSERT INTO user (first_name, last_name) VALUES (?,?)', values, function(err, result){
		if(err) resp(err);
		resp(null, result); //here it should return the user created, however need to test first
	});
}

exports.get_user_by_id = function(id, resp){
	values = [id];
	db.get().query("SELECT * FROM user WHERE id=?", values, function(err,result){
		if(err) resp(err);
		resp(null, user(result));
	});
}
