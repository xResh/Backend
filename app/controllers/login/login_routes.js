var router = require('express').Router();
var login_controller = require(global.include.controller.login.controller);

router.get('/', login_controller.authenticate_generic);
router.get("/facebook_login", login_controller.login_with_facebook);
router.get("/facebook_signup", login_controller.signup_with_facebook);

module.exports  = router;
