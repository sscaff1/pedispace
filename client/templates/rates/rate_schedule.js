Template.rateSchedule.onCreated(function() {
	Session.set('postSubmitErrors', {});
});

Template.rateSchedule.onRendered(function() {
	$('[name=scheduleDate]').datepicker({
	  format: "MM dd yyyy",
	  autoclose: true
	});
});

Template.rateSchedule.helpers({
  rateLists: function() {
    return Rates.find({}, {sort: {scheduleDate: 1}});
  }
});
