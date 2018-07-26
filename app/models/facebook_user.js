const user = require(global.include.model.user);
const db = require(global.include.db);
const async = require('asyncawait/async');
const await = require('asyncawait/await');

var facebook_user = function(sql_result){
	this.fb_id = sql_result.fb_id;
	this.user_id = sql_result.user_id;
	this.get_user = async function(){
		return await user.get_by_id(this.user_id);
	}
	return this;
}

var get_by_id = function(id){
	return new Promise(function(resolve, reject){
		values = [id];
		db.get().query('SELECT * FROM fb_users WHERE fb_id=?', values, function(err,result){
			if(err) return reject(err);
			if(result.length == 0) return resolve(null);
			return resolve(facebook_user(result[0]));
		});
	});
}

var create = function(fb_id, user_id){
	return new Promise(function(resolve, reject){
		values  = [fb_id, user_id];
		db.get().query('INSERT INTO fb_users (fb_id, user_id) VALUES (?,?)', values, function(err, result){
			if(err) return reject(err);
			return resolve(get_by_id(fb_id));
		});
	});
}

module.exports = {
	create: create,
	get_by_id: get_by_id
};
