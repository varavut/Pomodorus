var app = angular.module('pomodous',[ ]);

app.config(['$routeProvider',function($routeProvider){
    $routeProvider.when('/',{
        templateUrl:'home',
        controller:'homeC'
    })
}]);

app.controller('homeC',function($scope){

});