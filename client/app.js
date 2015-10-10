
angular.module('pomodorus',['angular-meteor','ngRoute']).controller('taskController',function($scope, $meteor){
    $scope.tasks = $meteor.collection(Tasks);

    $scope.join = function(){
        console.log($scope.name + $scope.todo);
        $scope.tasks.push({name:$scope.name,todo:$scope.todo});
    };



    $meteor.subscribe("times");
    $scope.times = $meteor.collection(Times);
    $scope.isRunning = $scope.times[0].isRunning;
});

