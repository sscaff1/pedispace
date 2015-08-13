Session.setDefault('week', 0);

Template.printSchedule.helpers({
	'thisSat': function() {
		return moment().day(6+7).format("dddd, MMMM Do YYYY");
	},
	'nextWeek': function () {
		return moment().day(6+14).format("dddd, MMMM Do YYYY");
	},
	'inc': function () {
		return Session.get('week');
	}
});

Template.printSchedule.events({
	'change select': function(e) {
		Session.set('week', $(e.target).val());
	}
});

