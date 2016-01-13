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
    var achieved = player.missions.achieved;
    var available = player.missions.available;
    var upcoming = player.missions.upcoming;
    if(achieved && achieved[missionTag]){
      ctrl.info = achieved[missionTag].actions[missionTag];
      ctrl.info.achieved = true;
    }
    else if(available && available[missionTag]){
      ctrl.info = available[missionTag].actions[missionTag];
      ctrl.info.available = true;
    }
    else if(upcoming && upcoming[missionTag]){
      ctrl.info = upcoming[missionTag].actions[missionTag];
      ctrl.info.upcoming = true;
    }
  };
  $rootScope.$watch(function(){
    ctrl.refresh();
    return true;
  });
  ctrl.text = $scope.text;
}]);
