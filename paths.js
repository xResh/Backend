let rootDir = path.resolve(__dirname);
let dbDir = path.resolve(__dirname + '/db');
let modelDir = path.resolve(__dirname + "/app/models");
let controllerDir = path.resolve(__dirname + "/app/controllers");
let viewDir = path.resolve(__dirname + "/app/views");
let helperDir = path.resolve(__dirname + "/app/helpers");


module.exports = {
	db: dbDir,

	model: {
		user: path.resolve(modelDir + '/user')
	},

	controller: {
		login: {
			controller: path.resolve(controllerDir + '/login/login_controller'),
			routes: path.resolve(controllerDir + '/login/login_routes')
		}
	},

	helper: {
		timestamp: path.resolve(helperDir + '/timestamp')
	}
}
