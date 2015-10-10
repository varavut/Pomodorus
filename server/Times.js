Meteor.publish("times", function () {
    return Times.find({});
});

currentTimeId = Times.find().count() == 0? Times.insert({value: 0}): Times.findOne()._id;

Meteor.setInterval(function () {
    var date = moment();
    var currentMinutes = date.minutes();
    var nextTimeUp = currentMinutes < 25 ? 25 : currentMinutes < 30 ? 30 : currentMinutes < 55 ? 55 : 60;
    var diff = date.clone().minutes(nextTimeUp).seconds(0).diff(date);
    Times.update(currentTimeId, {$set: {value: moment.utc(diff).format('mm:ss')}});
}, 1000);