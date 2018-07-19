const request = require('request');
const user = require(global.include.model.user);
const db = require(global.include.db);
const send_request = require(global.include)

var facebook_user = function(sql_result){
	this.fb_id = sql_result.fb_id;
	this.user_id = sql_result.user_id;
	this.get_user = function(resp){
		user.get_user_by_id(this.user_id, function(err, result){
			error.check(err,resp);
			resp(null, result);
		});
	}
	return this;
}

var get_by_id = function(id){
	return new Promise(function(resolve, reject){
		values = [id];
		db.get().query('SELECT * FROM fb_users WHERE fb_id=?', values, function(err,result){
			if(err) reject(err);
			if(result.length == 0) reject('Facebook User does not exist');
			resolve(facebook_user(result[0]));
		});
	});
}

var create = function(fb_id, user_id){
	return new Promise(function(resolve, reject){
		values  = [fb_id, user_id];
		db.get().query('INSERT INTO fb_users (fb_id, user_id) VALUES (?,?)', values, function(err, result){
			if(err) reject(err);
			resolve(facebook_user({'fb_id' : fb_id, 'user_id': user_id}));
		});
	});
}

var get_from_response = function(body){
	return new Promise(function(resolve, reject){
		get_by_id(body.id)
			.then(resolve)
			.catch(function(err){
				names = body.name.split(" ");
				user.create(names[0], names[names.length - 1])
					.then(function(user_id){
						return create(body.id, user_id);
					})
					.then(resolve)
					.catch(reject);
			});
	});
}

var get_by_token = function(token){
	return new Promise(function(resolve, reject){
		send_request.get({
			url: 'https://graph.facebook.com/me',
			qs: {'access_token': token}
		})
			.then(get__from_response)
			.then(resolve)
			.catch(reject);
	});
}

module.exports = {
	get_by_token: get_by_token,
	create: create,
	get_by_id: get_by_id
};
