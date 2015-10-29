Times = new Meteor.Collection("times");

Times.allow({
    insert: function (userId, swot) {
        if(Meteor.isServer) return true; return false;
    },
    update: function (userId, task, fields, modifier) {
        if(Meteor.isServer) return true; return false;
    },
    remove: function (userId, swot) {
        if(Meteor.isServer) return true; return false;
    }
});