Accounts.ui.config({passwordSignupFields: "USERNAME_ONLY"});
var app = angular.module('pomodorus', ['angular-meteor']).controller('taskController', ['$scope', '$meteor', function ($scope, $meteor) {
    $meteor.subscribe("tasks");
    $scope.tasks = $meteor.collection(Tasks);
    $scope.inputComments = {};
    $scope.join = function () {
        if ($scope.mytask.length == 0) {
            if ($scope.todo) {
                $scope.tasks.push(
                    {title: $scope.todo, owner: Meteor.userId(), createdAt: new Date(), status: 2, comments: {}, thumbs: 0});
                $scope.todo = '';} else {
                alert('Input your task')}}};
    $scope.addComment = function (task) {
        var d = task.comments[Meteor.userId()];
        if (!d) {
            d = {user: Meteor.user(), comment: $scope.inputComments[task.owner]};} else {
            d.user = Meteor.user();
            d.comment = $scope.inputComments[task.owner];}
    $scope.inputComments[task.owner] = '';}
    $scope.thumb = function (item) {
        console.log(Meteor.userId());
        if (!item.comments[Meteor.userId()]) {
            item.comments[Meteor.userId()] = {thumb: 1}} else {
            item.comments[Meteor.userId()].thumb = 1;}
        item.thumbs++;}
    $scope.mytask = $meteor.collection(function () {
        return Tasks.find({owner: Meteor.userId()});});
    $scope.confirm = function (taskConfirm) {
        $scope.mytask[0].status = taskConfirm;};
    $meteor.subscribe("times");
    $scope.times = $meteor.collection(Times);
    $scope.$watch('times[0].isRunning', function (newV, oldV) {
        if (!newV && newV != oldV) {
            var audio = new Audio('/sounds/alert.mp3');
            audio.play();}}, true);
    $meteor.subscribe("users");
    $scope.getUserById = function (userId) {
        return Meteor.users.findOne(userId);}
    $scope.getOwner = function (task) {
        if (!task) return;
        var owner = $scope.getUserById(task.owner);
        if (!owner) return 'N/A';
        return owner;};
    $scope.getProfileImage = function (user) {
        if (!user.services || !user.services.facebook)
            return "/images/profile.png";
        return "http://graph.facebook.com/"
            + user.services.facebook.id + "/picture/?type=large";}
    $scope.lastRoundDoneCount = function () {
        return Tasks.find({status: 1}).count();}
    $scope.lastRoundFailCount = function () {
        return Tasks.find({status: 0}).count();}
    $scope.lastRoundCount = function () {
        return Tasks.find().count();}}]).filter('displayName', function () {
    return function (user) {
        if (!user) return;
        if (user.username || user.email) return user.username || user.email;
        if (user.profile && user.profile.name) return user.profile.name;
        if (user.emails) return user.emails[0].address;
        return user._id;}
});
