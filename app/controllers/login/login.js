const user = require(global.include.model.user);
const fb_user = require(global.include.model.facebook_user);
const token = require(global.include.model.token);
const uuid4 = require('uuid/v4');

exports.authenticate_with_facebook = function(req, res){
	let params = req.query;
	if(!params.hasOwnProperty('access_token')){
		res.sendStatus(400);
	}

	let token = params.access_token;
	fb_user.get_facebook_user_by_token(token, function(err, fb_user){
		if(err){
			res.sendStatus(400);
			return;
		}

		fb_user.get_user(function(err, user){ // should probably just be fb_user get_auth_token
			if(err) res.sendStatus(501);

			let auth_token = uuid4();
			token.create(auth_token, user, function(err){
				if(err){
					res.sendStatus(501);
					return;
				}
				
				res.send(auth_token);
			})
		});
	});
}

exports.authenticate_generic = function(req, res){

}
