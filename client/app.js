angular.module('pomodorus',['angular-meteor']).controller('taskController',function($scope, $meteor){
    $scope.list = [ ];//Meteor.collection('list');
    $scope.join = function(){
        console.log($scope.name + $scope.todo);
        $scope.list.push({name:$scope.name,todo:$scope.todo});
        $scope.name = "";
        $scope.todo = "";
    }

    $meteor.subscribe("times");
    $scope.times = $meteor.collection(Times);
});


