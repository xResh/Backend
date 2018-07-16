const request = require('request');
const user = require(global.include.model.user);
const db = require(global.include.db);
const error = require(global.include.helper.error);

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

var get_facebook_user_by_id = function(id, resp){
	values = [id];
	db.get().query('SELECT * FROM fb_users WHERE fb_id=?', values, function(err,result){
		if(result.length === 0)	{
			resp(err, null);
			return;
		}
		resp(null, facebook_user(result[0]));
	});
}

var create = function(fb_id, user_id, resp){
	values  = [fb_id, user_id];
	db.get().query('INSERT INTO fb_users (fb_id, user_id) VALUES (?,?)', values, function(err, result){
		error.check(err,resp);
		resp(null, facebook_user({'fb_id' : fb_id, 'user_id': user_id}));
	});
}

exports.get_facebook_user_by_token = function(token, resp){
	let request_info = {
		url: 'https://graph.facebook.com/me',
		qs: {'access_token': token}
	};

	request.get(request_info, function(err, response, body){
		error.check(err,resp);

		body = JSON.parse(body);
		if(body.error){
			resp(body.error);
			return;
		}

		get_facebook_user_by_id(body.id, function(err, current_fb_user){
			error.check(err,resp);

			if(current_fb_user) {
				resp(null, current_fb_user);
				return;
			}
			// if there is no fb_user associated with this token then we create an fb_user
			names = body.name.split(" ");
			// must create a user before creating an fb_user
			user.create(names[0], names[names.length - 1], function(err, new_user_id){
				create(body.id, new_user_id, resp); // create the fb_user
			});
		});
	});
}
