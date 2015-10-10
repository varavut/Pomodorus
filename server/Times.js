Meteor.publish("times", function () {
    return Times.find({});
});

if (Times.find().count() == 0) {
    console.log('create new time object');
    Times.insert({value: 0});
}

currentTime = Times.findOne();

Meteor.setInterval(function () {
    var date = moment();
    var currentMinutes = date.minutes();
    var nextTimeUp = currentMinutes < 25 ? 25 : currentMinutes < 30 ? 30 : currentMinutes < 55 ? 55 : 60;
    var diff = date.clone().minutes(nextTimeUp).seconds(0).diff(date);
    Times.update(currentTime._id, {$set: {value: moment.utc(diff).format('mm:ss')}});
}, 1000);