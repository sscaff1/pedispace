Template.printSchedule.helpers({
	'thisSat': function() {
		return moment().day(6).format("dddd, MMMM Do YYYY");
	},
	'nextWeek': function () {
		return moment().day(6+7).format("dddd, MMMM Do YYYY");
	}
});
