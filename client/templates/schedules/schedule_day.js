Template.scheduleDay.helpers({
	riders: function(shift, rider) {
		return Requests.find({
			scheduled: true, 
			requestDate: new Date(this.dateValue), 
			shiftType: shift,
			rider: rider
		});
	},
	dateValuef: function() {
		return this.dateValue.format("dddd, MMMM Do YYYY")
	}
});