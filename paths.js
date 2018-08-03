const path = require('path');

let rootDir = path.resolve(__dirname);
let dbDir = path.resolve(__dirname + '/database/db');
let modelDir = path.resolve(__dirname + "/app/models");
let controllerDir = path.resolve(__dirname + "/app/controllers");
let viewDir = path.resolve(__dirname + "/app/views");
let helperDir = path.resolve(__dirname + "/app/helpers");


module.exports = {
	db: dbDir,

	model: {
		user: path.resolve(modelDir + '/user'),
		facebook_user: path.resolve(modelDir + '/facebook_user'),
		auth_token: path.resolve(modelDir + '/auth_token'),
		server: path.resolve(modelDir + '/server'),
		server_user: path.resolve(modelDir + '/server_user')
	},

	controller: {
		login: {
			controller: path.resolve(controllerDir + '/login/login'),
			routes: path.resolve(controllerDir + '/login/login_routes')
		},

		server: {
			controller: path.resolve(controllerDir + '/server/server'),
			routes: path.resolve(controllerDir + '/server/server_routes')
		}
	},

	helper: {
		send_request: path.resolve(helperDir + '/send_request'),
		timestamp: path.resolve(helperDir + '/timestamp')
	}
}
