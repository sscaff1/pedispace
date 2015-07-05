Template.bikesList.helpers({
	'bikes': function(){
		if (Roles.userIsInRole(Meteor.userId(), ['admin'])) {
			return Bikes.find({}, {sort: {locationId: 1, name: 1}});
		} else {
			var curUser = Meteor.user();
			return Bikes.find({locationId: curUser.profile.locationId}, {sort: {name: 1}});
		}
	}
});