Template.scheduleDay.helpers({
	'riders': function(shift) {
		return Requests.find({scheduled: true, requestDate: new Date(this.dateValue), shiftType: shift});
	},
	'dateValuef': function() {
		return this.dateValue.format("dddd, MMMM Do YYYY")
	},
	'userName': function() {
		var user = Meteor.users.findOne(this.userId);
		return {
			name: user.profile.name,
			phoneNumber: user.profile.phoneNumber,
			email: user.emails[0].address
		}
	}
});