Template.scheduleRider.helpers({
	'rider': function() {
		return Meteor.users.find({roles: 'biker', "profile.active": true});
	}
});