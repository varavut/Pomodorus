angular.module('pomodorus', ['angular-meteor']).controller('taskController', function ($scope, $meteor, $rootScope) {
    $meteor.subscribe("tasks");
    $scope.tasks = $meteor.collection(Tasks);
    $scope.lasted = {done:'x',fail:'x'}
    $scope.join = function () {

        if ($scope.mytask.length == 0) {
            var name = 'unknow';
            if ($rootScope.currentUser.profile) {
                name = $rootScope.currentUser.profile.name;
            }else{
                name = $rootScope.currentUser.emails[0].address;
            }
            if($scope.todo){
                $scope.tasks.push({name:name, todo: $scope.todo, trackId: Meteor.userId(),done:2});
            }else{
                alert('Input your task')
            }

        }

    };

    $scope.mytask = $meteor.collection(function () {
        return Tasks.find({trackId: Meteor.userId()});
    });

    $scope.confirm = function(taskConfirm){
        $scope.mytask[0].done = taskConfirm;
    };

    $meteor.subscribe("times");

    $scope.times = $meteor.collection(Times);
    $scope.$watch('times',function(newV,oldV){
        // watch times for alert
    },true)
});
