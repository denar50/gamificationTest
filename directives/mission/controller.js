angular.module('test').controller('MissionCtrl', ['gState', '$scope', '$rootScope',
function(gState, $scope, $rootScope){
  var ctrl = this;
  debugger;
  ctrl.statusClass = function(){
    return gState.player.missions.achieved && gState.player.missions.achieved[$scope.missionTag] ? 'done' : 'available';
  };

  ctrl.refresh = function(){
    var player = gState.player;
    var missionTag = $scope.missionTag;
    if(player.missions.achieved[missionTag]){
      ctrl.info = player.missions.achieved[missionTag].actions[missionTag];
      ctrl.info.achieved = true;
    }
    else{
      ctrl.info = player.missions.available[missionTag].actions[missionTag];
    }
  };
  $rootScope.$watch(function(){
    ctrl.refresh();
    return true;
  });
  ctrl.text = $scope.text;
}]);
