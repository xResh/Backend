var express = require('express');
var path = require('path');
var app = express();
var db = require('./db');

global.rootDir = path.resolve(__dirname);
global.dbDir = path.resolve(__dirname + '/db');
global.modelDir = path.resolve(__dirname + "/app/models");
global.controllerDir = path.resolve(__dirname + "/app/controllers");
global.viewDir = path.resolve(__dirname + "/app/views");
global.helperDir = path.resolve(__dirname + "/app/helpers");

app.use('/assets', require("./assets/assets"));
app.use('/user', require(global.controllerDir + "/user/user_routes"));
app.use('/', require(global.controllerDir + "/newsfeed/newsfeed_routes"));

db.connect(function(err) {
  if (err) {
    console.log('Unable to connect to MySQL.');
    process.exit(1);
  } else {
    app.listen(3300, function() {
      console.log('Listening on port 3300...');
    });
  }
});

var server = app.listen(process.env.PORT || 8000, function () {});
