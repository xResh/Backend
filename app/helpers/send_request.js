const request = require('request');

exports.get = function(request_info){
  return new Promise(function(resolve, reject){
    request.get(request_info, function(err, response, body){
      if(err) reject(err);

      body = JSON.parse(body);
      if(body.error) reject(body.error);
      resolve(body);
    });
  });
}
