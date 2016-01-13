angular.module('test', ['ngResource', 'angular-md5']);

angular.module('test').controller('MainCtrl', ['gameApi', 'gState', '$q',
function(gameApi, gState, $q){
  var ctrl = this;
  var listenersToDestroy = [];

  ctrl.gState = gState;

  ctrl.startGame = function(){
    if(ctrl.form.$valid){
      gState.email = ctrl.email;
      gameApi.getPlayer(gState.email)
      .then(function(response){
        debugger;
      })
      .catch(function(response){
        debugger;
      });
    }
  };

  ctrl.afterPlayFx = function(hasWon){
    var defer = $q.defer();
    if(hasWon){
      gameApi.play().then(function(){
        defer.resolve();
      });
    }
    else{
      defer.resolve();
    }
    return defer.promise;
  };

}]);
