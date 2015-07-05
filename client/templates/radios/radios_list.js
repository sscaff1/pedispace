Template.radiosList.helpers({
	'radios': function() {
		if (Roles.userIsInRole(Meteor.userId(), ['admin'])) {
			return Radios.find({}, {sort: {locationId: 1, name: 1}});
		} else {
			var curUser = Meteor.user();
			return Radios.find({locationId: curUser.profile.locationId}, {sort: {name: 1}});
		}
	}
})