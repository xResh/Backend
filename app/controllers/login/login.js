const user = require(global.include.model.user);
const fb_user = require(global.include.model.facebook_user);
const token = require(global.include.model.token);
const async = require('asyncawait/async');
const await = require('asyncawait/await');

exports.authenticate_with_facebook = async function(req, res){
	let params = req.query;
	if(!params.hasOwnProperty('access_token')){
		res.sendStatus(400);
	}
	try{
		let req_token = params.access_token;
		let facebook_user = await fb_user.get_by_token(req_token);
		let current_user = await facebook_user.get_user();
		let auth_token = await token.create(current_user);
		res.send(auth_token.token);
	}catch(err){
		res.send(err);
	}
}

exports.authenticate_generic = function(req, res){

}
