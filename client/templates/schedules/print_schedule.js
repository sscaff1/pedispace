Template.printSchedule.onCreated(function() {
	var instance = this;
	instance.scheduleDates = new ReactiveVar([]);
	instance.setNewDateRange = function(initialDate, finalDate) {
		var scheduleRange = [];
		var numDays = finalDate.diff(initialDate, 'day');
			for (var i = 0; i <= numDays; i++) {
			var pushDate = initialDate.clone().add(i, 'day');
			scheduleRange.push({scheduleDate: pushDate.clone()});
		}
		instance.scheduleDates.set(scheduleRange);
	}
});

Template.printSchedule.onRendered(function() {
	var instance = this;
	$('.datepicker').datepicker({
		format: "mm/dd/yyyy",
		autoclose: true,
		orientation: 'top'
	});
	var thisSat = moment().day(6).format("MM/DD/YYYY");
	$('[name=initialDate]').val(thisSat);
	var nextWeek = moment().day(6+7).format("MM/DD/YYYY");
	$('[name=finalDate]').val(nextWeek);
	var initialDate = moment(instance.$('[name=initialDate]').val(), 'MM/DD/YYYY');
	var finalDate = moment(instance.$('[name=finalDate]').val(), 'MM/DD/YYYY');
	instance.setNewDateRange(initialDate,finalDate);
});

Template.printSchedule.helpers({
	scheduleDates: function() {
		return Template.instance().scheduleDates.get();
	},
	scheduleDateNice: function() {
		return moment(this.scheduleDate).format('MMMM DD, YYYY')
	}
});

Template.printSchedule.events({
	'change .datepicker': function(event, instance) {
		var initialDate = moment(instance.$('[name=initialDate]').val(), 'MM/DD/YYYY');
		var finalDate = moment(instance.$('[name=finalDate]').val(), 'MM/DD/YYYY');
		instance.setNewDateRange(initialDate,finalDate);
	}
})
