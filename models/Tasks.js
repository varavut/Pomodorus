Tasks =  new Mongo.Collection('tasks');
Tasks.allow({
    insert: function (userId, swot) { return true; },
    update: function (userId, task, fields, modifier) { return true; },
    remove: function (userId, swot) {
        if(Meteor.isServer) return true; return false;
    }
});
