angular.module('pomodorus', ['angular-meteor']).controller('taskController', function ($scope, $meteor, $rootScope) {
    $meteor.subscribe("tasks");
    $scope.tasks = $meteor.collection(Tasks);
    $scope.lasted = {done: 'x', fail: 'x'}
    $scope.join = function () {
        if ($scope.mytask.length == 0) {
            var name = 'unknow';
            if ($rootScope.currentUser.profile) {
                name = $rootScope.currentUser.profile.name;
            } else {
                name = $rootScope.currentUser.emails[0].address;
            }
            if ($scope.todo) {
                $scope.tasks.push(
                    {
                        title: $scope.todo,
                        owner: Meteor.userId(),
                        createdAt: new Date(),
                        status: 2,
                        comments: []
                    }
                );
                $scope.todo = '';
            } else {
                alert('Input your task')
            }
        }
    };

    $scope.mytask = $meteor.collection(function () {
        return Tasks.find({owner: Meteor.userId()});
    });

    $scope.confirm = function (taskConfirm) {
        $scope.mytask[0].status = taskConfirm;
    };

    $meteor.subscribe("times");
    $scope.times = $meteor.collection(Times);
    $scope.$watch('times', function (newV, oldV) {
        // watch times for alert
    }, true)

    $meteor.subscribe("users");
    $scope.getUserById = function(userId){
        return Meteor.users.findOne(userId);
    }
    $scope.getOwner = function(task){
        if (!task) return;
        var owner = $scope.getUserById(task.owner);
        if (!owner) return 'N/A';
        return owner;
    };
    $scope.getProfileImage = function(user){
        if(!user.services || !user.services.facebook)
            return "/images/profile.png";
        return "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
    }

    /*
     structure of task
     var task = {
         title: '',
         owner: '',
         createdAt: new Date(),
         completed: false,
         comments: [
             {
                 message: '',
                 postBy:'',
             }
         ]
     }
     */
}).filter('displayName', function () {
    return function (user) {
        if (!user)
            return;
        if (user.profile && user.profile.name)
            return user.profile.name;
        else if (user.emails)
            return user.emails[0].address;
        else
            return user;
    }
});
