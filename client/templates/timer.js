var countdown = new ReactiveCountdown(60, {
  interval: 1000,
  step: 1,
});

countdown.start(function() {
    alert('time is up!');
});

Template.timer.helpers({
  getCountdown: function() {
    return countdown.get();
  }
});
