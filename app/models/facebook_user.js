const user = require(global.include.model.user);
const db = require(global.include.db);
const send_request = require(global.include.helper.send_request);
const async = require('asyncawait/async');
const await = require('asyncawait/await');

var facebook_user = function(sql_result){
	this.fb_id = sql_result.fb_id;
	this.user_id = sql_result.user_id;
	this.get_user = async function(){
		return await user.get_by_id(this.user_id)
	}
	return this;
}

var get_by_id = function(id){
	return new Promise(function(resolve, reject){
		values = [id];
		db.get().query('SELECT * FROM fb_users WHERE fb_id=?', values, function(err,result){
			if(err) reject(err);
			if(result.length == 0) resolve(null);
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

var get_from_response = async function(body){
	let fb_user = await get_by_id(body.id);
	if(fb_user) return fb_user;

	names = body.name.split(" ");
	let user = await user.create(names[0], names[names.length - 1])
	fb_user = await create(body.id, user.id);
	return fb_user;
}

var get_by_token = async function(token){
	let response = await send_request.get({
		url: 'https://graph.facebook.com/me',
		qs: {'access_token': token}
	});
	let fb_user = await get_from_response(response)
	return fb_user;
}

module.exports = {
	get_by_token: get_by_token,
	create: create,
	get_by_id: get_by_id
};
