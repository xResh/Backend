const request = require('request');
const user = require(global.include.model.user);
const db = require(global.include.db);

var facebook_user = function(sql_result){
	this.fb_id = sql_result.fb_id;
	this.user_id = sql_result.user_id;

	this.get_user = function(resp){
		user.get_user_by_id(this.user_id, function(err, result){
			if(err) resp(err);
			resp(null, result);
		});
	}
}

var get_facebook_user_by_id = function(id, resp){
	values = [id];
	db.get().query('SELECT * FROM fb_users WHERE fb_id=?', values, function(err,result){
		if(result.length == 0)	resp(null);
		resp(facebook_user(result[0]));
	});
}

var create = function(fb_id, user_id, resp){
	values  = [fb_id, user_id];
	db.get().query('INSERT INTO fb_users (fb_id, user_id) VALUES (?,?)', values, function(err, result){
		if(err) resp(err);
		resp(null, result); // should return fb_user object
	});
}

exports.get_facebook_user_by_token = function(token, resp){
	let request_info = {
		url: 'https://graph.facebook.com/me',
		qs: {'access_token': token}
	};

	request.get(request_info, function(err, response, body){
		if(err) resp(err);
		get_facebook_user_by_id(body.id, function(current_user){
			if(user) resp(null, current_user);

			names = body.name.split(" ");
			user.create(names[0], names[names.length - 1], function(err, new_user){
				create(new_user.id, body.id, resp);
			});
		});
	});
}
