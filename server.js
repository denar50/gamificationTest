var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var q = require('q');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

function getConnectionData(){
  return {
    url: 'http://playngage.io/api',
    method: 'GET',
    json: true,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization' : 'Token token=056f8605ad92174d3ba35c0a5463015f'
    }
  }
}

function getPlayerData(email){
  var defer = q.defer();
  var connectionData = getConnectionData();
  connectionData.url += '/players/game_data/'+email + '?missions_info=available,upcoming,achieved';
  request(connectionData, function(error, response, body){
    if(error || body.status === 'Player not found.' || parseInt(body.status) > 400)
    {
      defer.reject(body);
    }
    else{
      defer.resolve(body)
    }
  });
  return defer.promise;
}

function createPlayer(email){
  var defer = q.defer();
  var connectionData = getConnectionData();
  connectionData.url += '/players?id_in_app='+email;
  connectionData.method = 'POST';
  request(connectionData, function(error, response, body){
    if(error || parseInt(body.status) > 400)
    {
      defer.reject(body);
    }
    else{
      defer.resolve(body)
    }
  });
  return defer.promise;
}

function addDollars(amount){

}

app.get('/api/player/:email', function(req, res){
  var email = req.params.email;
  getPlayerData(email)
  .then(processGetPlayerData)
  .catch(function(body){
    if(body.status === 'Player not found.'){
      createPlayer(email)
      .then(function(body){
        getPlayerData(email)
        .then(processGetPlayerData)
        .catch(onError);
      })
      .catch(onError);
    }
    else{
      onError(body);
    }
  });
  function onError(body){
    res.status(500);
    res.send(body);
  }
  function processGetPlayerData(body){
    res.status(200);
    res.send(body);
  }
});

app.post('/api/play/:email', function(req, res){
  var email = req.params.email;
  var connectionData = getConnectionData();
  connectionData.url += '/accomplishments/v2?acc1[players]='+email+'&acc1[actions]=win_&acc1[options]=tag_type';
  connectionData.method = 'POST';
  request(connectionData, function(error, response, body){
    if(error || parseInt(body.status) > 400)
    {
      res.status(500);
      res.send(body);
    }
    else{
      res.status(200);
      res.send(body);
    }
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
