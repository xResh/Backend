const db = require(global.include.db);
const timestamp = require(global.include.helper.timestamp);
const error = require(global.include.helper.error);

var user = function(sql_result){
	//user class definition
	this.id = sql_result.id;
	this.first_name = sql_result.first_name;
	this.last_name = sql_result.last_name;
	this.created_at = timestamp.timestamp_to_date(sql_result.created_date);

	return this;
}

var get_by_id = function(id){
	return new Promise(function(resolve, reject){
		values = [id];
		db.get().query("SELECT * FROM users WHERE id=?", values, function(err,result){
			if(err) reject(err);
			resolve(user(result[0]));
		});
	});
}

var create = function(first_name, last_name){
	new Promise(function(resolve, reject){
		values = [first_name, last_name];
		db.get().query('INSERT INTO users (first_name, last_name) VALUES (?,?)', values, function(err, result){
			if(err) reject(err);
			get_user_by_id(result.insertId)
			.then(resolve)
			.catch(reject);
		});
	});
}

module.exports = {
	get_by_id: get_by_id,
	create: create
};
