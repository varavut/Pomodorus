angular.module('pomodorus', ['angular-meteor']).controller('taskController', function ($scope, $meteor, $rootScope) {
    $meteor.subscribe("tasks");
    $scope.tasks = $meteor.collection(Tasks);
    $scope.join = function () {

        if ($scope.mytask.length == 0) {
            var name = 'unknow';
            if ($rootScope.currentUser.profile) {
                name = $rootScope.currentUser.profile.name;
            }else{
                name = $rootScope.currentUser.emails[0].address;
            }
            if($scope.todo){
                $scope.tasks.push({name:name, todo: $scope.todo, trackId: Meteor.userId()});
            }

        }

    };

    $scope.mytask = $meteor.collection(function () {
        return Tasks.find({trackId: Meteor.userId()});
    });

    $scope.confirm = function(taskConfirm){

    };

    $meteor.subscribe("times");

    $scope.times = $meteor.collection(Times);
    $scope.$watch('times',function(newV,oldV){
        if(!$scope.times[0].isRunning){

        }
    },true)
});
