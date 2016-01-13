angular.module('test').factory('gState', [function(){
  var gState = {};
  var player = {};
  Object.defineProperty(gState, 'player', {
    get: function(){
      return player;
    },
    set: function(newPlayer){
      player = newPlayer;
    }
  })
  return gState;
}]);
