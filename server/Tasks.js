Meteor.publish("tasks", function () {
    var startTime = moment().startOf('minute');
    if(startTime.minutes()< 30){
        startTime.minutes(0);
    }else{
        startTime.minutes(30);
    }
    var endTime = startTime.clone();
    endTime.add(30, 'minutes');
    return Tasks.find({
        createdAt: {
            $gte: startTime.toDate(),
            $lt: endTime.toDate()
        }
    });
});