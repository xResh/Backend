const user = require(global.include.model.user);
const request = require('request');

exports.authenticate_with_facebook = function(req, res){
	let params = req.query;
	if(!params.hasOwnProperty('access_token')){
		res.sendStatus(400);
	}

	let token = params.access_token;
	let request_info = {
		url: 'https://graph.facebook.com/me',
		qs: {'access_token': token}
	};
	request.get(request_info, function(err, resp, body){
		user.facebook_user()
	});
}
