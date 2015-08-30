Template.scheduleDayUser.helpers({
	userName: function() {
		var user = Meteor.users.findOne(this.userId);
		return {
			name: user.profile.name,
			phoneNumber: user.profile.phoneNumber,
			email: user.emails[0].address
		}
	}
})