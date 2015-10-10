Meteor.publish("times", function(){
   return Times.find({});
});

if(Times.find().count() == 0){
    Times.insert({time:0});
}

currentTime = Times.findOne();

Meteor.setInterval(function(){currentTime.time = new Date();},1000);