
angular.module('pomodorus',['angular-meteor']).controller('taskController',function($scope, $meteor){
    $meteor.subscribe("tasks");
    $scope.tasks = $meteor.collection(Tasks);
    $scope.mytask = $meteor.collection(function(){
        return Tasks.find({name:'me'});
    });
    $scope.join = function(){
        console.log($scope.name + $scope.todo);
        var pseudoId = Math.random() * 10000000;
        $scope.tasks.push({name:$scope.name,todo:$scope.todo,trackId:pseudoId});
    };

    $meteor.subscribe("times");
    $scope.times = $meteor.collection(Times);
    $scope.isRunning = $scope.times[0].isRunning;



});

