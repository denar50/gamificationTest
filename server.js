var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/mission', function(req, res){
  var connectionData = {
    url: 'http://playngage.io/api/accomplishments/v2?acc1[players]=03593937548f9836c665fdebd8e2def9&acc1[actions]=complete_task',
    method: 'POST',
    json: true,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization' : 'Token token=056f8605ad92174d3ba35c0a5463015f'
    }
  };
  request(connectionData, function(error, response, body){
    res.send(body);
  });
});
app.post('/task', function(req, res){
  var connectionData = {
    url: 'http://playngage.io/api/accomplishments/v2?acc1[players]=03593937548f9836c665fdebd8e2def9&acc1[actions]=complete_task',
    method: 'POST',
    json: true,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization' : 'Token token=056f8605ad92174d3ba35c0a5463015f'
    }
  };
  request(connectionData, function(error, response, body){
    res.send(body);
  });
});

app.use('/icons', express.static(__dirname + '/icons'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/app-build.js', express.static(__dirname + '/app-build.js'));
app.use('/style.css', express.static(__dirname + '/style.css'));
app.use('/directives/', express.static(__dirname + '/directives/'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

var server = app.listen(3000, 'localhost', function () {
   var port = server.address().port;
   console.log('App running on http:// ' + server.address().address +':' + port)
});
