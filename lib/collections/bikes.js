Bikes = new Mongo.Collection('bikes');

Bikes.allow({
	update: function(userId, doc) {
		return Roles.userIsInRole(userId, ['manager']);
	}
});

Meteor.methods({
	bikeAdd: function(bike) {
		var bike = _.extend(bike, {
			active: true,
			businessId: Meteor.user().profile.businessId
		});
		Bikes.insert(bike);
	}
});
