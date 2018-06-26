var router = require('express').Router();
var login_controller = require(global.include.controller.login.controller);

router.get("/facebook_login", login_controller.authenticate_with_facebook);

module.exports  = router;
