angular.module('test').controller('GameMachineCtrl', [function(){
  var ctrl = this;
  ctrl.getRandomShapeIndex = getRandomShapeIndex;
  var shapes = ['flaticon-animal608', 'flaticon-china1', 'flaticon-fruit235'];

  init();

  function init(){
    ctrl.currentShapes = [];
    shapes.forEach(function(){
      ctrl.currentShapes.push(shapes[getRandomShapeIndex()]);
    });
  }

  function getRandomShapeIndex(){
    return Math.floor((Math.random() * shapes.length));
  };
}]);
