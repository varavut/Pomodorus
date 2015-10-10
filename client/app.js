angular.module('pomodorus',['angular-meteor']).controller('taskController',function($scope){
    $scope.list = [ ];//Meteor.collection('list');
    $scope.join = function(){
        console.log($scope.name + $scope.todo);
        $scope.list.push({name:$scope.name,todo:$scope.todo});
        $scope.name = "";
        $scope.todo = "";
    }
});


