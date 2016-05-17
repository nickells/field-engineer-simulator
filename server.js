var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile( __dirname + '/index.html');
});

app.listen(1337, function () {
  console.log('Listening on port 1337!');
});