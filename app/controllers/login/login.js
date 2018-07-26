const user = require(global.include.model.user);
const fb_user = require(global.include.model.facebook_user);
const auth_token = require(global.include.model.auth_token);
const send_request = require(global.include.helper.send_request);
const async = require('asyncawait/async');
const await = require('asyncawait/await');


//just logging in with fb_account
exports.login_with_facebook = async function(req, res){
	let params = req.query;
	if(!params.hasOwnProperty('access_token')){
		res.sendStatus(400);
	}
	try{
		//let facebook_user = await fb_user.get_by_token(params.access_token);
		let body = await send_request.get({
			url: 'https://graph.facebook.com/me',
			qs: {'access_token': access_token}
		});

		let facebook_user = await fb_user.get_by_id(body.id);
		if(facebook_user == null) throw ('No fb_user exists');

		let current_user = await facebook_user.get_user();
		let token = await auth_token.create(current_user);
		res.send(token.token);
	}catch(err){
		console.log(err);
		res.send(err);
	}
}

//creating a new fb_account
exports.signup_with_facebook = async function(req, res){
	let params = req.query;
	if(!params.hasOwnProperty('access_token')){
		res.sendStatus(400);
	}
	try{
		let body = await send_request.get({
			url: 'https://graph.facebook.com/me',
			qs: {'access_token': access_token}
		});

		let facebook_user = await fb_user.get_by_id(body.id);
		if(facebook_user) throw ('fb_user already exists');

		names = body.name.split(" ");
		let new_user = await user.create(names[0], names[names.length - 1])
		facebook_user = await create(body.id, new_user.id);

		let current_user = await facebook_user.get_user();
		let token = await auth_token.create(current_user);
		res.send(token.token);
	}catch(err){
		console.log(err);
		res.send(err);
	}
}

exports.authenticate_generic = function(req, res){

}
