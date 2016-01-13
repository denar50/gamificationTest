angular.module('test').directive('gameMachine', [function(){
  return {
    templateUrl: '/directives/gameMachine/view.html',
    controller: 'GameMachineCtrl as gameMachineCtrl',
    scope: {
      afterPlayFx: '=?'
    }
  };
}]);
