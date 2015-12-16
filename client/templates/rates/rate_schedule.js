Template.rateSchedule.helpers({
  rateLists: function() {
    return Rates.find({}, {sort: {scheduleDate: 1}});
  }
});
