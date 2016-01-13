angular.module('test', ['ngResource', 'angular-md5']);

angular.module('test').controller('MainCtrl', ['gameApi', 'gState',
function(gameApi, gState){
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
    debugger;
    if(hasWon){
      gameApi.play();
    }
  };

}]);
