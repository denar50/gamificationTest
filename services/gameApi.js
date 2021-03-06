angular.module('test').factory('gameApi', ['md5', '$resource', 'gState', '$q',
function(md5, $resource, gState, $q){
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
    return promise;
  };

  api.play = function(){
    var defer = $q.defer();
    play.save({email: md5.createHash(gState.email)}).$promise.then(function(){
      api.getPlayer().then(function(){
        defer.resolve();
      })
      .then(function(){
        defer.reject();
      })
      .then(function(){
        defer.reject();
      });
    });
    return defer.promise;
  };

  return api;
}]);
