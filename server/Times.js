Meteor.publish("times", function () {return Times.find({});});
currentTimeId = Times.findOne()._id || Times.insert({value: 0});
Meteor.setInterval(function () {
    var date = moment();
    var cMinutes = date.minutes();
    var nextTimeUp = cMinutes <= 25 ? 25 : cMinutes <= 30 ? 30 : cMinutes <= 55 ? 55 : 60;
    var diff = date.clone().minutes(nextTimeUp).seconds(0).diff(date);
    Times.update(currentTimeId, {$set: {value: moment.utc(diff).format('mm:ss')}});
}, 1000);