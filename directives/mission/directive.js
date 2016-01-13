angular.module('test').directive('mission', [
function(){
  return {
    templateUrl: '/directives/mission/view.html',
    controller: 'MissionCtrl as missionCtrl',
    restrict: 'E',
    transclude: true,
    scope: {
      missionTag: '=',
      text: '='
    }
  };
}]);
