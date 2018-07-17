const user = require(global.include.model.user);
const fb_user = require(global.include.model.facebook_user);
const token = require(global.include.model.token);
const error = require(global.include.helper.error);

exports.authenticate_with_facebook = function(req, res){
	let params = req.query;
	if(!params.hasOwnProperty('access_token')){
		res.sendStatus(400);
	}

	let req_token = params.access_token;
	fb_user.get_facebook_user_by_token(req_token, function(err, fb_user){
		error.status_check(err, res);

		fb_user.get_user(function(err, user){
			error.status_check(err, res);

			token.create(auth_token, user.id, function(err, auth_token){
				error.status_check(err, res);
				res.send(auth_token);
			})
		});
	});
}

exports.authenticate_generic = function(req, res){

}
