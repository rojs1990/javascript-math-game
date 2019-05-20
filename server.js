var express = require('express');
var app = express();
var path = require('path');
 
app.get('/index', function (req, res) {
  res.render('index.html');
});
app.get('/style.css', function(req, res) {
  res.sendFile(__dirname + "/" + "style.css");
});
 
app.listen(3000)