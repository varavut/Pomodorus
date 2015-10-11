Meteor.publish("times", function () {
    return Times.find({});
});
currentTimeId = Times.find().count()?Times.findOne()._id : Times.insert({value: 0});
Meteor.setInterval(function () {
    var date = moment();
    var cMinutes = date.minutes();
    var nextTimeUp = cMinutes < 25 ? 25 : cMinutes < 30 ? 30 : cMinutes < 55 ? 55 : 60;
    var diff = date.clone().minutes(nextTimeUp).seconds(0).diff(date);
    var isRunning = nextTimeUp == 25 || nextTimeUp == 55;
    Times.update(currentTimeId, {$set: {value: moment.utc(diff).format('mm:ss'),isRunning: isRunning}});
    //TODO: clear task list for new session
}, 1000);