Template.shiftsList.helpers({
	'shifts': function() {
		return Shifts.find({}, {sort: {submitted: -1}});
	}
});