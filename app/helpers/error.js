exports.check = function(err, resp){
  if(err){
    console.log(err);
    resp(err);
    return;
  }
}

exports.status_check = function(err, res){
  if(err){
    console.log(err);
    res.send(400);
  }
}
