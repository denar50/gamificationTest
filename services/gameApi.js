angular.module('test').factory('gameApi', ['md5', '$resource', 'gState',
function(md5, $resource, gState){
  var player = $resource('/api/player/:email', {email: '@email'});
  var play = $resource('/api/play/:email', {email: '@email'});
  var api = {};

  api.getPlayer = function(userEmail){
    var email = userEmail || gState.email;
    var promise = player.get({email: md5.createHash(email)}).$promise;
    promise.then(function(response){
      gState.player = {
        info: response.player_info,
        missions: response.missions
      }
    });
    return player.get({email: md5.createHash(userEmail)}).$promise;
  };

  api.play = function(){
    return play.save({email: md5.createHash(gState.email)}).$promise.then(function(){
      api.getPlayer();
    });
  };

  return api;
}]);
