Bikes = new Mongo.Collection('bikes');

Bikes.allow({
	update: function(userId, doc) {
		var businessId = Meteor.user().profile.businessId;
		if (businessId === doc.businessId) {
			return Roles.userIsInRole(userId, ['manager']);
		} else {
			return false;
		}
	}
});

Meteor.methods({
	bikeAdd: function(bike) {
		check(bike.name, String);
		var bike = _.extend(bike, {
			active: true,
			businessId: Meteor.user().profile.businessId
		});
		Bikes.insert(bike);
	}
});
