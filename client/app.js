angular.module('pomodous',['angular-meteor']).controller('taskController',function($scope){
    var list = Meteor.collection('list');
    $scope.join = function(){
        console.log($scope.name + $scope.todo);
        $scope.list.insert({name:$scope.name,todo:$scope.todo});
        $scope.name = "";
        $scope.todo = "";
    }
});


