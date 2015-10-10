
angular.module('pomodorus',['angular-meteor']).controller('taskController',function($scope, $meteor){
    $meteor.subscribe("tasks");
    $scope.tasks = $meteor.collection(Tasks);




    $scope.user = Meteor.user();
    $scope.join = function(){

        if (!$scope.mytask){
            $scope.tasks.push({name:Meteor.user().profile.name,todo:$scope.todo,trackId:Meteor.userId()});
        }

    };

    var getUserTask = function(){
        $scope.mytask = $meteor.collection(function(){
            return Tasks.find({trackId:Meteor.userId()});
        });
    };

    if(Meteor.user()){

        getUserTask();
    }

    Accounts.onLogin(function(){
        $scope.user = Meteor.user();
    });
    $meteor.subscribe("times");
    $scope.times = $meteor.collection(Times);

});

