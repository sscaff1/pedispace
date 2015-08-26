Template.rateSchedule.helpers({
	dateValuef: function() {
		return this.dateValue.format("dddd, MMMM Do YYYY");
	},
	rate: function(shift) {
		return Rates.find({shiftType: shift, scheduleDate: new Date(this.dateValue)});
	},
});