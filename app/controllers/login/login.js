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
	fb_user.get_by_token()
		.then(function(fb_user){
			return fb_user.get_user();
		})
		.then(token.create())
		.then(function(auth_token){
			res.send(auth_token);
		})
		.catch(function(err){
			console.log(err);
			res.sendStatus(400);
		});
}

exports.authenticate_generic = function(req, res){

}
