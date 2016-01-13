angular.module('test').controller('GameMachineCtrl', ['$interval', '$q', '$scope', function($interval, $q, $scope){
  var ctrl = this;
  var shapes = ['flaticon-animal608', 'flaticon-china1', 'flaticon-fruit235'];
  ctrl.getRandomNumberBetween = getRandomNumberBetween;
  ctrl.play = play;
  ctrl.playing = false;

  init();

  function init(){
    ctrl.currentShapes = [];
    shapes.forEach(function(){
      ctrl.currentShapes.push(shapes[getRandomNumberBetween(0, shapes.length)]);
    });
  }

  function getRandomNumberBetween(start, end){
    return Math.floor((Math.random() * end) + (start || 0));
  };

  function play(){
    ctrl.playing = true;
    var promises = [];
    for(var i = 0, length = ctrl.currentShapes.length; i < length; i++){
      promises.push(playSingle(i));
    }
    $q.all(promises).then(function(){
      ctrl.hasWon = getWinStatus();
      if(angular.isFunction($scope.afterPlayFx))
      {
         $scope.afterPlayFx(ctrl.hasWon).then(function(){
           ctrl.playing = false;
         });
      }
      else{
        ctrl.playing = false;
      }
    });
  }

  function getWinStatus(){
    var hasWon = true;
    var currentShape = ctrl.currentShapes[0];
    for(var i = 1, length = ctrl.currentShapes.length; i < length; i++){
      if(ctrl.currentShapes[i] !== currentShape){
        hasWon = false;
        break;
      }
    }
    return hasWon;
  }

  function playSingle(index){
    var defer = $q.defer();
    var miliseconds = parseInt(getRandomNumberBetween(1, 3)) * 1000;
    var intervalTime = 0;
    var shapesIndex = 0;
    var stop = $interval(function(){
      if(shapesIndex >= shapes.length){
        shapesIndex = 0;
      }
      ctrl.currentShapes[index] = shapes[shapesIndex++];
      intervalTime += 80;
      if(intervalTime >= miliseconds)
      {
        ctrl.currentShapes[index] = shapes[getRandomNumberBetween(1, shapes.length - 1)];
        //ctrl.currentShapes[index] = shapes[0];
        $interval.cancel(stop);
        stop = undefined;
        defer.resolve();
      }
    }, 80);
    return defer.promise;
  }
}]);
