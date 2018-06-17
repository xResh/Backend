var User = require(global.modelDir + "/user");

exports.create = function(req,res){
  var params = req.query;
  User.create(params['username'], params['password'],  params['email'], params['screen_name'], function(err, suc){
    if(err){
      console.log(err);
      res.sendStatus(400);
    }else{
      console.log(suc);
      res.sendStatus(200);
    }
  });
}

exports.sign_in = function(req,res){
  var username = req.query['username'];
  User.get_user(username,function(err,suc){
    if(err){
       console.log(err);
       res.sendStatus(400);
     }else {
       console.log(suc);
       res.sendStatus(200);
     }
  });
}
