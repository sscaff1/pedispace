Bikes = new Mongo.Collection('bikes');

Bikes.allow({
	update: function(userId, doc) {
		return Roles.userIsInRole(userId, ['admin', 'manager']);
	}
});

Meteor.methods({
	bikeAdd: function(bike) {
		var bike = _.extend(bike, {
			active: true
		});
		Bikes.insert(bike);
	}
});