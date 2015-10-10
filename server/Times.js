Meteor.publish("times", function () {
    return Times.find({});
});

if (Times.find().count() == 0) {
    console.log('create new time object');
    Times.insert({time: 0});
}

currentTime = Times.findOne();

console.log(currentTime);

Meteor.setInterval(function () {
    //currentTime.time = new Date();
Times.update(currentTime._id,{$set:{time:new Date()}});
    //console.log('currentTime updated '+ currentTime.time);
}, 1000);