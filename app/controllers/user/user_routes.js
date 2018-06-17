var router = require('express').Router();
var user_controller = require("./user");

router.post("/create", user_controller.create);
router.post("/sign_in", user_controller.sign_in);

module.exports  = router;